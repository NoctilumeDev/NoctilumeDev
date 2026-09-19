# Docker Desktop Windows 套接字崩溃：无损恢复与停止边界

> **恢复目标不是“让弹窗消失”，而是在不触碰镜像、容器、卷和 WSL 数据盘的前提下，证明 Docker 引擎重新可用。**

本文记录一类 Windows 上的 Docker Desktop 启动故障，以及适用于个人开发机的低风险恢复边界。它不是通用根因声明，也不把一次恢复成功包装成上游缺陷已经根治。

## 一、适用症状

Docker Desktop 启动后报告 `An unexpected error occurred`，错误包含：

```text
listening on unix://...
remove ...sock: The file cannot be accessed by the system.
```

常见路径包括：

```text
%LOCALAPPDATA%\Docker\run\sailor-ingest.sock
%LOCALAPPDATA%\docker-secrets-engine\engine.sock
```

Windows 上这些 0 字节文件可能是 AF_UNIX socket 对应的 NTFS reparse point。早期现场看起来像“异常退出留下坏 socket”；后续复现表明，这个模型并不完整：Docker 在全新的空运行时目录中创建出的特定 socket，当轮仍可被 Docker 使用时，从 Windows 文件系统视角就可能已经无法正常查询、取得 file ID 或改名。异常退出未必创造异常对象，但会让下一次启动必须处理旧路径，从而把问题暴露为启动崩溃。

## 二、证据分级

### OBSERVED / 已观察

2026-09-01，在 Docker Desktop 4.88.1（Windows、WSL 2 后端）上观察到：

1. 首次启动因 `sailor-ingest.sock` 无法移除而失败；
2. 完整停止 Docker Desktop 并隔离纯运行时 `run` 目录后，启动继续前进；
3. 第二次启动因 `docker-secrets-engine\engine.sock` 无法移除而失败；
4. 确认该目录只有一个 0 字节 reparse point 后，将目录改名留档并重建空目录；
5. 再次冷启动后，`docker desktop status` 返回 `running`；
6. `docker version` 成功读取服务端，`docker run --rm hello-world` 成功拉取并运行容器。

本机同时保留了更早日期的同类 socket 隔离目录，说明这是复发现象，不应解释为单次项目构建造成。

2026-09-19，在 Docker Desktop 4.90.0、Windows 11 build 26200.9457、WSL 2.7.3 上继续复现并修正了故障模型：

1. 完整停止 Docker 与 `docker-desktop` WSL 后端，保留式隔离原 `Docker\run`，让 Docker 在不存在旧 socket 的路径上冷启动；
2. 新实例创建的 `dockerInference`、`sailor-ingest.sock`、`dockerEthernetVfkit` 与 `userAnalyticsOtlpHttp.sock` 当轮即可呈现 0 字节 reparse point，Windows 查询、改名或读取文件标识会返回错误 1920；
3. Docker daemon 在这一轮仍能运行真实容器，说明“Docker 当前可用”和“宿主能正常管理 socket 路径”不是同一个事实；
4. 当承载 Docker 的上层桌面进程异常退出后，下一次 Docker 启动首先在旧 `docker-secrets-engine\engine.sock` 上失败；隔离该目录的同时，还必须再次隔离失败启动刚刚创建的新 `Docker\run`；
5. 完成两个运行时根目录的保留式隔离后，同一 Docker 4.90.0 冷启动成功，原镜像、卷和容器数据仍在，真实 Compose 容器恢复运行。

这组观察把“历史残留文件”推进成了“Docker 创建路径与 Windows 文件系统视图之间的生命周期不一致”。它仍然不是最终根因。

### CONTROL / 对照实验

为避免把所有 Windows AF_UNIX 都归入同一个问题，在同一宿主上使用普通 .NET AF_UNIX listener 做了三类对照：正常退出、进程异常退出、listener 保持存活。三种情况下均未复现 Docker 对象那种无法查询、无法改名、无法取得文件标识的状态。

这个对照只能排除“Windows 上任意 AF_UNIX 都必然如此”，不能单独证明 Docker Desktop 是唯一责任方。Docker 的 socket 创建参数、Windows build 26200、NTFS、WSL2 以及本机文件系统过滤驱动之间的交互仍需进一步收窄。

### EXTERNAL / 外部证据

- Docker 官方故障排查文档把 Restart、Clean up data 与 Reset to factory defaults 区分为不同风险级别；后两者可能丢失设置或数据：<https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/>
- Docker Desktop 4.89.0 与 4.90.0 的官方 release notes 都写明修复了“非正常关闭遗留 stuck socket 导致 Desktop 无法启动”的问题；本机在 4.90.0 上仍复现，说明至少存在一个未被该修复覆盖的触发路径，不能据此声称官方修复完全无效或已经回归：<https://docs.docker.com/desktop/release-notes/>
- Docker 的公开问题记录了 Windows build 26200、WSL2、`dockerInference`、`engine.sock`、错误 1920 和父目录改名恢复这一同型故障簇；这些报告是外部相似性证据，不代替本机归因：<https://github.com/docker/desktop-feedback/issues/460>、<https://github.com/docker/desktop-feedback/issues/527>

### INFERRED / 已推断

当前证据支持的最窄结论是：**Docker Desktop 的特定 socket 创建/使用路径，与 Windows 26200 上的 AF_UNIX、NTFS 或文件系统过滤栈之间存在生命周期交互；Docker 当轮可用时，宿主侧对象就可能已经异常，下一次需要替换旧路径时才崩溃。**

目前不能把责任单独归给 Docker、Windows、WSL、杀毒软件、厂商驱动或其中任意一方，也不能证明每一次相同错误文案都来自同一触发条件。异常退出是可靠的暴露条件之一，但不再被写成已证明的起因。

## 三、先确认不是项目故障

这类错误发生在 Docker Desktop 后台服务初始化阶段，早于 Compose 构建或业务容器启动。应先分层：

```text
Docker Desktop 后台尚未启动
→ Docker daemon 不可访问
→ Compose / 项目构建自然无法开始
→ 不能把宿主故障记成项目构建失败
```

最低限度保存：

```powershell
docker desktop status
docker version
wsl --list --verbose

Get-CimInstance Win32_Process |
  Where-Object { $_.Name -match 'docker|com\.docker' } |
  Select-Object ProcessId, ParentProcessId, Name, ExecutablePath, CommandLine
```

日志通常位于：

```text
%LOCALAPPDATA%\Docker\log\host\monitor.log
```

公开证据应脱敏，不直接上传完整本机日志、用户名、代理、令牌或内部路径。

## 四、低风险恢复顺序

### 第 0 步：先保护两个状态面

恢复动作前先分别保护代码现场和容器数据现场：

- 对尚未提交的仓库保存 HEAD、`git status`、tracked/staged diff、未跟踪文件副本和 Git bundle；
- 如果容器数据不可替代且磁盘空间允许，在 Docker 与 `docker-desktop` WSL 完全停止后冷复制实际使用的 Docker data VHDX，并核对文件大小与 SHA-256；
- 不在 VHDX 仍被 Docker 或 WSL 使用时复制，也不把 Git bundle 当作未提交工作区的备份。

这里只隔离纯运行时 socket，不要求每次恢复都复制整个数据盘；但当根因未知、数据价值高或后续可能升级到更强操作时，应先建立可验证的回退点。

### 第 1 步：先正常停止

```powershell
docker desktop stop --timeout 60
```

如果后台已经崩溃且正常停止失败，再使用：

```powershell
docker desktop stop --force --timeout 30
```

随后确认没有残留 Docker Desktop 进程。只关闭窗口不等于后台已经退出。

### 第 2 步：停止 Docker 的 WSL 后端

```powershell
wsl --terminate docker-desktop
```

如果机器还运行其他 WSL 发行版，不要无差别执行 `wsl --shutdown`，除非已经确认影响范围。

### 第 3 步：只读检查 socket 目录

```powershell
$dockerRunDir = Join-Path $env:LOCALAPPDATA 'Docker\run'
$dockerSecretsDir = Join-Path $env:LOCALAPPDATA 'docker-secrets-engine'

Get-ChildItem -LiteralPath $dockerRunDir -Force
Get-ChildItem -LiteralPath $dockerSecretsDir -Force
```

只有满足以下条件时，才进入隔离步骤：

- Docker / `com.docker` 进程已全部退出；
- 目录内容已逐项查看；
- 内容是 0 字节 reparse point 等纯运行时 socket；
- 没有配置、密钥、数据库、镜像、卷或未知普通文件。

任何一项不满足，都停止，不猜测。

### 第 4 步：改名隔离，不强删

单个 reparse point 可能连移动或删除都会返回 Windows 错误 1920。此时不要使用恢复出厂，也不要递归清理 Docker 数据根目录。可以在确认目录只含运行时 socket 后，将父目录整体改名留档；优先让 Docker 在下次启动时重建运行时目录，只有组件明确要求目录预先存在时才手工建立空目录：

```powershell
$recoveryStamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$dockerRunDir = Join-Path $env:LOCALAPPDATA 'Docker\run'
$dockerSecretsDir = Join-Path $env:LOCALAPPDATA 'docker-secrets-engine'

Rename-Item -LiteralPath $dockerRunDir -NewName "run-stale-$recoveryStamp"
Rename-Item -LiteralPath $dockerSecretsDir -NewName "docker-secrets-engine-stale-$recoveryStamp"
```

这一步必须逐目录执行并逐次验证。一次失败启动可能已经在新的 `Docker\run` 中再次创建异常 socket；如果后续错误转移到另一个已确认的纯运行时根目录，应重新停止、重新观察，再决定是否隔离，不能在 Docker 仍运行时批量处理所有目录。不要把它扩写成对 `%LOCALAPPDATA%\Docker` 的递归删除脚本。

### 第 5 步：冷启动与三级验收

```powershell
docker desktop start --detach
docker desktop status
docker version
docker run --rm hello-world
```

三级验收分别证明：

1. Desktop 状态机进入 `running`；
2. 客户端能够访问真实 daemon；
3. daemon 能完成镜像拉取、容器创建、运行和自动删除。

只看到 Dashboard 打开，不算恢复成功。

## 五、明确禁止的动作

在没有独立备份和更强证据前，不做：

- `Reset to factory defaults`；
- Clean / Purge data；
- 注销或删除 `docker-desktop` WSL 发行版；
- 删除 Docker 的 WSL 数据盘；
- 批量删除镜像、卷、容器或整个 `%LOCALAPPDATA%\Docker`；
- 同时升级 Docker、修改 WSL、关闭安全软件和清理目录；
- 因 Docker 宿主失败而改动业务仓库代码。

这些动作会破坏因果链，部分动作还会造成不可恢复的数据丢失。

## 六、何时停止

出现以下任一情况，停止本地修复并保留现场：

- socket 目录出现普通文件、配置、密钥或未知数据；
- 完整停机后仍存在无法识别的持有进程；
- WSL 自身报虚拟化、VHDX、发行版注册或文件系统错误；
- 每隔离一处就出现新的非 socket 故障；
- `docker version` 能连接 daemon，但真实容器仍失败；
- 修复需要恢复出厂、重装或删除数据盘。

此时优先生成脱敏诊断、核对 Docker 当前版本的 release notes，并等待上游修复。诊断包可能包含本机信息；上传前应确认内容和传输边界。

## 七、长期边界

用户侧可以降低复发概率，但不能替代上游修复：

- 关机或重启 Windows 前，先让 Docker Desktop 正常停止并确认状态；
- 不连续点击启动入口，不在后台退出过程中重复拉起；
- 保持 Docker Desktop 与 WSL 在受支持版本；
- 升级前阅读 Windows 相关 release notes，升级后做冷启动和真实容器验证；
- 隔离目录先保留，经过后续冷启动验证后再单独决定是否清理；
- 把“宿主恢复成功”和“项目容器构建通过”记录为两条证据。

原生 Linux 不经过 NTFS reparse point、Docker Desktop 与 WSL2 这一组合层，因此会直接移除本次故障模型中的关键边界；这不等于 Linux 上的 Docker 不会因 overlay2、inode、cgroup、权限、网络或 OOM 等原因失败。更稳妥的长期做法，是把 Windows 保留为日常开发环境，同时用原生 Linux 作为独立的 reference deployment / clean reproduction environment。

真正的根治条件不再只是“异常退出后能清理 stale socket”，而是：Docker 创建的运行时 socket 在宿主文件系统视角始终可管理；异常退出后能可靠替换旧路径；任一组件失败都不会把 Desktop 锁进不可恢复的启动循环。上游明确覆盖这一触发路径，并经本机多轮冷启动、异常终止和真实容器验证前，应把它保留为已知环境边界。

## 八、最终箭头

```text
保存错误与日志
→ 区分宿主失败和项目失败
→ 保护未提交代码与不可替代的容器数据
→ 正常停止，必要时强制停止
→ 终止 Docker WSL 后端
→ 只读确认目录内容
→ 改名隔离纯运行时 socket
→ 冷启动
→ status + daemon + 真实容器三级验收
→ 记录“恢复了可用窗口”，保留根因未知，不伪称根治
```

核心原则：

> **能无损恢复，就不以重置代替诊断；无法证明安全，就在停止线前停下。**
