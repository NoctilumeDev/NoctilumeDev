# NoctilumeDev

Student developer focused on reliable software systems, reproducible engineering, and clearly bounded experiments. I build business systems, examine their reliability limits, turn the acceptance method into tooling, and study the framework mechanisms underneath them.

> 精确里程碑、冻结基线与当前任务由各项目仓库的 README / Release 维护；本页只描述稳定的项目角色，避免复制状态后发生漂移。工程范围已经闭环，不一定等于作品在我心中已经停止生长。

## Flagship Work

| Project | What it demonstrates | Open it |
| --- | --- | --- |
| **[VeriTrail](https://github.com/NoctilumeDev/VeriTrail)** | A local-first evidence and acceptance workbench for controlled, reproducible engineering experiments. This is the current methodology and verification mainline. | [Repository and live status](https://github.com/NoctilumeDev/VeriTrail#当前状态) |
| **[MiniSpringBoot](https://github.com/NoctilumeDev/MiniSpringBoot)** | A from-scratch teaching implementation of Spring-style IoC, AOP, Web/MVC, configuration, JDBC, transactions and bootstrapping, proven through a real React + MySQL demo. | [Architecture and verified milestones](https://github.com/NoctilumeDev/MiniSpringBoot#路线图) |
| **[PlainJournal](https://github.com/NoctilumeDev/PlainJournal)** | A verified self-operated e-commerce reference baseline focused on consistency, degradation, multi-instance behavior and browser-level evidence. | [Online preview](https://noctilumedev.github.io/PlainJournal/) · [Repository](https://github.com/NoctilumeDev/PlainJournal) |
| **[DarkRoomLibrary](https://github.com/NoctilumeDev/DarkRoomLibrary)** | A complete Spring Boot + Vue library workflow product with MySQL, Redis, RabbitMQ, role boundaries and frozen multi-instance acceptance evidence. | [Online preview](https://noctilumedev.github.io/DarkRoomLibrary/) · [Release evidence](https://github.com/NoctilumeDev/DarkRoomLibrary/releases) |
| **[InkNarratives](https://github.com/NoctilumeDev/InkNarratives)** | Five dependency-free HTML experiments in Chinese literary narrative, typography and visual expression. | [Works and editorial status](https://github.com/NoctilumeDev/InkNarratives) |

The engineering thread is intentional:

```text
complete business systems
→ distributed reliability and failure boundaries
→ reproducible evidence and deterministic verdicts
→ framework mechanisms rebuilt from first principles
```

## Research / Planned

- [PlainJournalPro](https://github.com/NoctilumeDev/PlainJournalPro) - reference architecture for a future multi-merchant evolution; explicitly not presented as implemented software.
- [FlowKernel](https://github.com/NoctilumeDev/FlowKernel) - long-term research planning for lifecycle-aware, continuity-preserving resource scheduling; implementation has not started.

## Project Journey / 项目沿革

这些仓库不是预先规划好的一条产品线，而是我在不同阶段真正想解决的问题。这里把“已验证的工程边界”和“个人心中的最终完成度”分开记录。

- **2026 年 3-4 月 · InkNarratives / 墨叙**

  无聊时做的五个零依赖单文件 HTML Demo，用来尝试中文长文、滚动叙事和氛围视觉。大二暑假整理项目时，我决定把它们一起公开。页面原型能够运行，但文本内容、资料来源和编辑结构还没有打磨到我认可的程度，因此它仍是未完成的实验集。

- **2026 年 5-7 月 · DarkRoomLibrary / 暗室藏书**

  个人构想形成于 5 月，7 月的大二短学期课程提供了落地窗口。主体在 7 月中旬成形，课程提交后继续补齐业务闭环、技术迁移、真实联调、并发验证与公开材料，并于 **2026-07-27** 形成最终交付事实基线。PlainJournal 启动时，暗室藏书仍有少量细节和发布收尾；后续版本继续完成了这些工程化加固。详细沿革见仓库内的[项目历史](https://github.com/NoctilumeDev/DarkRoomLibrary/blob/main/docs/project-history.md)和[项目起源 PDF](https://github.com/NoctilumeDev/DarkRoomLibrary/blob/main/docs/暗室藏书_项目起源.pdf)。

- **2026 年 7-8 月 · PlainJournal / 素简记**

  在暗室藏书收尾期间，我开始尝试微服务，并于 **2026-07-16** 建立 PlainJournal 的可运行基线。M0-M8 完成后，项目于 **2026-08-03** 首次公开。后来确认 M9+ 的多商户、平台账本和 Java/Go 异构协作无法在当前 16GB 单机上完成同等严格的真实验收，因此把它们独立为 PlainJournalPro，等扩容后继续。

  PlainJournal 不是不成熟的 Basic 版：M0-M8 的业务、可靠性和验收范围已经闭环。但我对当前前端视觉仍不满意，视觉重构尚未开始，所以从作品完成度看，它仍在继续打磨。

- **2026 年 8 月 · VeriTrail / 验迹**

  前面的项目到达各自阶段边界后，我不想继续在存量里无边界堆功能，于是把反复遇到的验收痛点沉淀为一个独立工具：用控制变量、不可变证据、真实浏览器、资源停止线和确定性裁决回答“这次运行究竟证明了什么”。VeriTrail 也是一个认知放大器和工程脚手架；它已经形成多轮可寻址冻结基线，并继续演进 Workbench 表现与最终验收。精确进度只在[仓库当前状态](https://github.com/NoctilumeDev/VeriTrail#当前状态)维护。

- **2026 年 8 月 · MiniSpringBoot**

  在使用 Spring Boot 构建完整系统之后，我回到底层重新实现 IoC、AOP、配置、Web/MVC、JDBC、事务与启动机制，并用真实 React + MySQL 链路验证它不是只能通过单测的纸面框架。它补上了“会使用框架”之外的机制理解，也为将来由冻结版 VeriTrail 验收多实例与故障边界建立了被验对象。

工程闭环可以冻结，审美、内容、认知和下一阶段仍会继续生长。敬请期待。

## Current Focus

- VeriTrail Workbench implementation and evidence-driven validation; exact milestone state lives in the repository
- MiniSpringBoot multi-instance and failure-contract preparation before any VeriTrail verdict is attempted
- Frontend architecture and visual redesign for PlainJournal
- Public CI, dependency gates, and concise evidence entry points across the flagship repositories
- Resource-aware validation on constrained single-machine environments

Detailed architecture decisions, test evidence, and release artifacts live in each project repository.

## Engineering Notes / 工程札记

- [硅谷中国特色改良版：拖鞋版单兵工程法](docs/solo-engineering-method.md) - 一套面向个人开发的工程折中：压扁组织，保留需求、架构、实现、验收、发布与冻结的职责。
