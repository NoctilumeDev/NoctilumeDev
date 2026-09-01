# NoctilumeDev

Student developer focused on reliable software systems, reproducible engineering, and clearly bounded experiments. I build business systems, examine their reliability limits, turn the acceptance method into tooling, and study the framework mechanisms underneath them.

> 精确里程碑、冻结基线与当前任务由各项目仓库的 README / Release 维护；本页只描述稳定的项目角色，避免复制状态后发生漂移。工程范围已经闭环，不一定等于作品在我心中已经停止生长。

## Flagship Work

| Project | What it demonstrates | Open it |
| --- | --- | --- |
| **[VeriTrail](https://github.com/NoctilumeDev/VeriTrail)** | A local-first evidence and acceptance workbench for controlled, reproducible engineering experiments. This is the current methodology and verification mainline. | [Repository and release status](https://github.com/NoctilumeDev/VeriTrail#发布状态) |
| **[MiniSpringBoot](https://github.com/NoctilumeDev/MiniSpringBoot)** | A from-scratch teaching implementation of Spring-style IoC, AOP, Web/MVC, configuration, JDBC, transactions and bootstrapping, proven through a real React + MySQL demo. | [Architecture and verified milestones](https://github.com/NoctilumeDev/MiniSpringBoot#路线图) · [Teaching → Engineering experiment](https://github.com/NoctilumeDev/MiniSpringBoot/blob/main/docs/teaching-to-engineering.md) |
| **[PlainJournal](https://github.com/NoctilumeDev/PlainJournal)** | A verified self-operated e-commerce reference baseline focused on consistency, degradation, multi-instance behavior and browser-level evidence. | [Online preview](https://noctilumedev.github.io/PlainJournal/) · [Repository](https://github.com/NoctilumeDev/PlainJournal) |

## Selected Experiments

| Project | What it explores | Open it |
| --- | --- | --- |
| **[DarkRoomLibrary](https://github.com/NoctilumeDev/DarkRoomLibrary)** | A complete Spring Boot + Vue library workflow product with MySQL, Redis, RabbitMQ, role boundaries and frozen multi-instance acceptance evidence. | [Online preview](https://noctilumedev.github.io/DarkRoomLibrary/) · [Release evidence](https://github.com/NoctilumeDev/DarkRoomLibrary/releases) |
| **[InkNarratives](https://github.com/NoctilumeDev/InkNarratives)** | Five dependency-free HTML experiments in Chinese literary narrative, typography and visual expression. | [Online gallery](https://noctilumedev.github.io/InkNarratives/) |

The engineering thread is intentional:

```text
complete business systems
→ distributed reliability and failure boundaries
→ reproducible evidence and deterministic verdicts
→ framework mechanisms rebuilt from first principles
```

These projects were developed through AI-assisted solo engineering. I own problem definition, architecture,
acceptance contracts, failure analysis, release decisions and freeze boundaries; models and agents assist with
implementation, review and repeatable execution. Public repository creation dates reflect publication or
restructuring, not necessarily project inception.

## Research / Planned

- [PlainJournalPro](https://github.com/NoctilumeDev/PlainJournalPro) - reference architecture for a future multi-merchant evolution; explicitly not presented as implemented software.
- [FlowKernel](https://github.com/NoctilumeDev/FlowKernel) - long-term research planning for lifecycle-aware, continuity-preserving resource scheduling; implementation has not started.

<details>
<summary><strong>Project Journey / 展开项目沿革与时间说明</strong></summary>

### Project Journey / 项目沿革

这些仓库不是预先规划好的一条产品线，而是我在不同阶段真正想解决的问题。这里把“已验证的工程边界”和“个人心中的最终完成度”分开记录。

- **2026 年 3-4 月 · InkNarratives / 墨叙**

  无聊时做的五个零依赖单文件 HTML Demo，用来尝试中文长文、滚动叙事和氛围视觉。大二暑假整理项目时，我决定把它们一起公开。页面原型能够运行，但文本内容、资料来源和编辑结构还没有打磨到我认可的程度，因此它仍是未完成的实验集。

- **2026 年 5-7 月 · DarkRoomLibrary / 暗室藏书**

  个人构想形成于 5 月，7 月的大二短学期课程提供了落地窗口。主体在 7 月中旬成形，课程提交后继续补齐业务闭环、技术迁移、真实联调、并发验证与公开材料，并于 **2026-07-27** 形成最终交付事实基线。PlainJournal 启动时，暗室藏书仍有少量细节和发布收尾；后续版本继续完成了这些工程化加固。详细沿革见仓库内的[项目历史](https://github.com/NoctilumeDev/DarkRoomLibrary/blob/main/docs/project-history.md)和[项目起源 PDF](https://github.com/NoctilumeDev/DarkRoomLibrary/blob/main/docs/暗室藏书_项目起源.pdf)。

- **2026 年 7-8 月 · PlainJournal / 素简记**

  在暗室藏书收尾期间，我开始尝试微服务，并于 **2026-07-16** 建立 PlainJournal 的可运行基线。M0-M8 完成后，项目于 **2026-08-03** 首次公开。后来确认 M9+ 的多商户、平台账本和 Java/Go 异构协作无法在当前 16GB 单机上完成同等严格的真实验收，因此把它们独立为 PlainJournalPro，等扩容后继续。

  PlainJournal 不是不成熟的 Basic 版：M0-M8 的业务、可靠性和验收范围已经闭环。但我对当前前端视觉仍不满意，视觉重构尚未开始，所以从作品完成度看，它仍在继续打磨。

- **2026 年 8 月 · VeriTrail / 验迹**

  前面的项目到达各自阶段边界后，我不想继续在存量里无边界堆功能，于是把反复遇到的验收痛点沉淀为一个独立工具：用控制变量、不可变证据、真实浏览器、资源停止线和确定性裁决回答“这次运行究竟证明了什么”。Core M0-M14 已冻结并发布；后置入口层也已分别发布 Starter 与 Authoring Skill。入口层只提供 `single-webapp` / `static-site` 有界草案，保持 `DRAFT / NOT SEALED`，封存与裁决仍由 Core 完成。精确版本与发布坐标只在[仓库发布状态](https://github.com/NoctilumeDev/VeriTrail#发布状态)维护。

- **2026 年 8 月 · MiniSpringBoot**

  在使用 Spring Boot 构建完整系统之后，我回到底层重新实现 IoC、AOP、配置、Web/MVC、JDBC、事务与启动机制，并用真实 React + MySQL 链路验证它不是只能通过单测的纸面框架。它补上了“会使用框架”之外的机制理解；M10 又由冻结版 VeriTrail 对多实例、故障、事务与就绪证据做了独立复验，同时明确保留未被证明的全拓扑生命周期边界。

工程闭环可以冻结，审美、内容、认知和下一阶段仍会继续生长。敬请期待。

</details>

## Maintenance Posture

- Preserve MiniSpringBoot's frozen multi-instance and failure-contract evidence without extending its stated boundary.
- Preserve VeriTrail's deterministic verdict authority while keeping the bounded Starter and Authoring Skill reproducible.
- Keep PlainJournal's M0-M8 reference baseline stable; visual work may evolve separately without changing business facts.
- Keep public claims, CI, Releases and concise evidence entry points aligned across maintained repositories.
- Keep FlowKernel and PlainJournalPro visibly planned until executable evidence changes their status.

Detailed architecture decisions, test evidence, and release artifacts live in each project repository.

## Solo Engineering Toolkit / 单兵工程三剑客

一个人不需要复制一整套组织，但必须补齐环境认知、工程施工和公共验证三种职责：

```text
看清机器
→ 把项目做成
→ 让公共证据链也成立
```

1. **[单机工程环境全景认知法](docs/single-machine-engineering-environment.md)** - 开工前先认识硬件、系统、工具链、中间件、网络、项目拓扑与资源停止线；PlainJournal 的[本地开发网络与 Windows 故障边界](https://github.com/NoctilumeDev/PlainJournal/blob/main/docs/07-local-development-network.md)是其中一份实战手册。
2. **[硅谷中国特色改良版_拖鞋（妥协）版单兵工程法](docs/solo-engineering-method.md)** - 压扁组织，保留需求、架构、实现、验收、发布与冻结；妥协的是单人协调成本，不是工程质量。
3. **[单兵工程公共验证闭环法](docs/public-verification-loop.md)** - 把本地测试、干净环境、平台依赖、GitHub Actions 触发器、PR 提交归属和公开证据入口闭合起来。

### 本机故障边界附录

- **[Docker Desktop Windows 套接字崩溃：无损恢复与停止边界](docs/docker-desktop-windows-socket-recovery.md)** - 从宿主故障与项目失败的分层开始，只隔离已确认的纯运行时 socket，以 `status + daemon + 真实容器` 完成恢复验收；不以恢复出厂、重装或清空数据代替诊断。

### Fresh Checkout 实证附录

- **[从对话记忆到工程记忆：Fresh Checkout 三阶段独立复验](docs/fresh-checkout-independent-audit.md)** - 三个串行、相互隔离的 Codex 角色只依靠公开 GitHub 资产完成发现、修复与再审：首轮 `F1` 的 4 项问题全部闭环，新 `HEAD` 又独立暴露 3 项残余维护问题。它为“上下文应沉淀为工程记忆”提供可复核的工程证据，但不宣称学术证明或零缺陷。

## Essays / 工程复盘与方法论

这三篇文章分别讨论能力生产、事实资格与验收方法。它们来自同一段连续工程实践，但不互相代替：

| Writing | It asks | Status |
| --- | --- | --- |
| **[从工具增益到协同复利](docs/from-tool-gain-to-collaborative-compounding.pdf)** | 人、模型、工作流、上下文和历史资产怎样共同影响单位经验证交付？ | `论文体工程复盘 · 初稿`，按原始观察封存 |
| **[保护零：从答案生成到事实成立](docs/protecting-zero-from-answer-to-fact.pdf)** | 当生成者、测试和审查都可能共享错误前提时，一个声明凭什么取得事实资格？ | `论文体工程复盘 · 理论续篇 · 归档修订版`，20 页 PDF |
| **[对抗性工程验收：怎样让“完成”脱离作者仍然成立](docs/adversarial-engineering-validation.pdf)** | 怎样用固定坐标、独立证据、环境扰动、失败保留和停止条件完成归档验收？ | `论文体工程复盘 · 归档方法篇`，19 页 PDF |

第一篇解释“能力如何共同产生”；第二篇解释“未知为什么必须被保护”；第三篇解释“如何把原则变成工程事实”。它们不是学术论文，也不把单一使用者的纵向案例包装成普遍规律。

需要网页内概念检索或沿链接复核时，可使用两份配套导读：[《保护零》导读](docs/protecting-zero.md)与[《对抗性工程验收》导读](docs/adversarial-engineering-validation.md)。导读不是 PDF 正文的缩写替代品。

### Afterword / 番外

- **[一个人的大厂](docs/one-person-big-company.pdf)** - 当一个人把部门、角色、会议和流程全部复制给自己，唯一没有出现的东西可能就是项目进度。
