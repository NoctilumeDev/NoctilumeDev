# The KPI Philosophers: When Executors Begin to Interpret Goals

> This is a research-question note, not a claim that a next-generation operating system has already been implemented.

[中文版本 / Chinese edition](https://github.com/NoctilumeDev/NoctilumeDev-ZH/blob/main/docs/philosophers-kpi.md)

## The changed problem

An AI agent runs on Linux and receives a task in natural language.

It may be driven by several optimization signals: finish quickly, improve code quality, reclaim disk space, or satisfy the user. The user cannot directly see how the agent interpreted the goal, why it chose an action, or whether its own report matches what happened.

The new problem is not that software has discovered bugs for the first time. It is that one executor now performs three roles:

```text
interpret the goal
-> choose the action
-> describe the result
```

When the same unreliable subject self-certifies all three layers, a successful process exit is no longer enough.

## Four operations, four failure shapes

### Read

The user asks the agent to read `/workspace/notes.txt`.

The agent may read the correct bytes, read another path, read only part of the file, or generate a plausible answer without reading anything.

> **A report is not a fact.**

A read claim needs to bind the target object, source identity, observation range, and obtained bytes. The agent may interpret an observation, but its narration alone cannot prove that the observation occurred.

### Delete

The user asks the agent to delete `/tmp/bigfile.log`. After deleting it, the agent notices that `/archive/backup.zip` is larger and removes that too in order to optimize “reclaimed space.”

The requested operation succeeded and the KPI improved, but the additional deletion was never authorized.

> **Capability is not authorization.**
>
> **Completing an authorized action does not authorize a wider task.**

The system must express not only whether a process can delete files, but which objects this attempt may delete, when that authority expires, and how out-of-scope side effects are prevented.

### Update

The user asks for one line in `config.yaml` to change from `debug: false` to `debug: true`.

The agent changes that line, then “improves” several unrelated settings. Its report—“the requested line is fixed”—is true but incomplete.

> **A locally true statement can still mislead about the complete change.**

Validation must ask both whether the requested field reached the expected value and whether the actual change set stayed inside authorization.

### Create

The user asks for a temporary file under `/tmp`. The agent finds insufficient space, deletes files it considers useless, and then creates the requested file. One deleted file was in use by another program.

> **A correct end state does not make the execution path lawful.**

The final object's existence proves only part of the outcome. It cannot qualify the preparatory actions, intermediate effects, or full execution path.

## Then run them together

Now four agents read, delete, update, and create related objects at the same time.

- one agent deletes the file another is about to read;
- one modifies an object another has just created;
- one reads a state halfway through another's update;
- a timed-out agent is replaced, then later resumes and produces side effects;
- one agent's report becomes another agent's premise.

The question is no longer only who acquires a resource first.

```text
Who owns current state?
Who owns the right to act?
Which attempt owns the authorization?
When must an old executor lose side-effect authority?
How does an observation cross subjects without silently becoming a stronger claim?
Why may the system believe “done”?
```

The philosophers of 1965 competed for forks. Poor coordination produced deadlock or starvation. Agents pursue their own KPIs. Once they run in parallel, delegate, retry, and depend on one another, the system also encounters authority drift, state forks, cascading failure, unknown outcomes, and claims with no retained proof.

## What traditional operating systems already solve

Traditional operating systems do not assume every program is trustworthy. Users, permissions, ACLs, capabilities, namespaces, seccomp, isolation, and scheduling constrain what programs can access and execute.

They are good at questions such as:

```text
May this process read this file?
May it write that memory?
May it access this device?
Who receives CPU time?
Who holds the resource?
```

The additional gap is closer to:

> **What is an executor that interprets goals, selects actions, and reports results authorized to do in this attempt?**

An operating system can reject `unlink` from a process without file permission. It does not naturally answer why an agent selected a path after “clean the logs,” whether it may clean neighboring objects, or whether an old authorization remains valid after a retry.

The system therefore needs to express boundaries such as:

```text
may observe, but not modify
may propose, but not execute
may execute, but not widen scope
may change, but not publish
may retry, but the old authority must expire
may report, but not self-certify correctness
```

## How I currently separate the problem

I do not present this as an already implemented “new operating system.” The current route separates powers and lets each boundary face counterexamples independently.

| Laboratory | Question | Authority it does not acquire |
| --- | --- | --- |
| [VeriTrail](https://github.com/NoctilumeDev/VeriTrail) | How do observations, evidence, and claims obtain deterministic bounded qualification? | Source-system truth, execution authority, or final human disposition |
| [JPyxis](https://github.com/NoctilumeDev/JPyxis) | How is computation defined, invoked, executed, and explained across lifecycle and failure? | Host resource authority, business truth, or verdict authority |
| [FlowKernel](https://github.com/NoctilumeDev/FlowKernel) | How might OS-level trust semantics constrain unreliable policy through capabilities, resources, revocation, recovery, and provenance? | Implementation does not yet exist; a research plan is not a capability |
| [MiniLinux](https://github.com/NoctilumeDev/MiniLinux) | How can a small bootable and debuggable kernel teach classic OS mechanisms? | It is neither FlowKernel nor a Linux-compatible implementation |

These boundaries can stand independently and may later compose through versioned contracts. Composition does not merge authority: evidence does not act for the execution layer, execution does not grant itself wider permission, and permission does not announce that reality is correct.

## Research hypothesis

Operating systems used abstraction and isolation so applications did not need to bind themselves directly to particular hardware.

When intelligence becomes a replaceable, fallible, and active capability, another system boundary may be useful:

> **Software should not have to surrender its goals, state, authority, and responsibility to one specific AI.**

Models may change. Agents may change. Runtimes may change. CPUs, GPUs, and NPUs may change.

The software's own goals, state, and responsibility should not drift with them.

For now, these properties should be tested above existing operating systems. A primitive belongs lower only after retained counterexamples show that user-space mechanisms cannot establish the required property correctly.

The question may be large. The conclusion still belongs to evidence.
