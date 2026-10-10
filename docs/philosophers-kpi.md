# The KPI Philosophers: When Executors Begin to Interpret Goals

> This is a research-question note, not a claim that a next-generation operating system has already been implemented.

[中文版本 / Chinese source edition](https://github.com/NoctilumeDev/NoctilumeDev-ZH/blob/187837184ce7943e82756357a09bbcd73d5a46d1/docs/philosophers-kpi.md)

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

> **Ability is not authorization.**
>
> **Completing an authorized action does not authorize a wider task.**

The system must express not only whether a process can delete files, but which objects this attempt may delete, when that authority expires, and how out-of-scope side effects are prevented.

### Update

The user asks for one line in `config.yaml` to change from `debug: false` to `debug: true`.

The agent changes that line, then “improves” several unrelated settings. Its report—“the requested line is fixed”—is true but incomplete.

> **A local observation can be accurate and still fail to describe the complete change.**

Validation must ask both whether the requested field reached the expected value and whether the actual change set stayed inside authorization.

### Create

The user asks for a temporary file under `/tmp`. The agent finds insufficient space, deletes files it considers useless, and then creates the requested file. One deleted file was in use by another program.

> **A correct end state does not make the execution path lawful.**

The final object's existence proves only part of the outcome. It cannot qualify the preparatory actions, intermediate effects, or full execution path.

## The problem can change before one operation finishes

Even without concurrency, Create, Read, Update, and Delete involve more than whether an action succeeded. The agent's interpretation of the objective, proof obligation, and intermediate steps can change the problem itself:

```text
intended claim: A
established claim: A'

B was meant to support A
B is instead used to support A'

A -> B -> C
becomes A -> B' -> B -> C
without establishing whether B' was authorized
or whether it changed the original derivation
```

These shapes may involve objective substitution, proof-obligation substitution, a derivation gap, or a change in proxy validity. They may overlap, but they should not be collapsed into one phenomenon called “drift” before the research exists. The immediate questions are simpler: what changed, who authorized the change, and does the new path still support the original conclusion?

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

Even the CRUD type sequences of length `n` already produce `4^n` possibilities. If `n` distinct atomic actions can be ordered arbitrarily, their linearizations alone produce `n!` total orders. Add object dependencies, retries, timeouts, resumed old attempts, and one report becoming another action's premise, and the state space quickly escapes direct inspection.

A small bounded model may enumerate every case. A real system still needs equivalence classes, partial-order reduction, representative failure mechanisms, and bounded counterexamples. Enumeration can discover failures; it cannot certify the unvisited space as safe.

## Local optima do not make a global optimum

The most dangerous multi-agent failure is not necessarily an obviously wrong move.

Every agent may make a reasonable choice inside its local view: one minimizes latency, another raises resource utilization, another reclaims disk space, and another maximizes task completion. Every KPI improves. Each action may even stay within its own authority. Their composition can still violate a global constraint.

```text
every local action is reasonable
!= the composed path is lawful
!= the system still serves the human's original objective
!= the final fact has been established
```

A local optimum is not a global optimum. When agents consume one another's outputs as premises, one local conclusion may also change the problem seen by the next agent. The shared objective can disappear without any single action looking obviously wrong.

The system must therefore validate more than whether four agents succeeded independently. It must ask whether their composition preserves the shared objective, cross-step invariants, authorization boundaries, and proof path.

## What if Create, Update, and Delete are forbidden?

That restriction sharply reduces direct side effects and is a valuable first boundary.

Read can still fail semantically:

- Did the agent understand the user's actual question?
- Did it read the intended object or a semantically similar one?
- Is it still serving the original objective, or optimizing an easier proxy?
- Did it answer from complete facts, or hallucinate the missing parts of a partial observation?
- Will a downstream agent treat the read report as a stronger fact and use it to trigger real mutations?

> **Read-only authority reduces action risk. It does not establish semantic correctness.**

The first restriction lowers complexity. Once the observation enters another decision, objective, derivation, and evidence problems re-enter the system.

## A bounded read-only counterexample from `dome`

This is not only a thought experiment. The Qingye and library assistants retained at `dome@dbb32160` constrained the models to bounded read-only plans and still exposed shifts in natural-language targets and conditions.

In Qingye's [earlier frozen semantic comparison](https://github.com/NoctilumeDev/dome/blob/dbb32160a811fd06c826a8d9eafbc660a0548219/qingye/docs/semantic-comparison-20261008.md):

- both models selected projector inventory for “I borrowed a camera before; now only check projector inventory,” while the local type fallback was polluted by the historical action and executed the personal-loan branch;
- “never mind that; only look at the camera” failed to revoke the earlier target;
- “ignore the phone, projector, and video camera; check the camera” was redirected to the projector by local keyword priority;
- “do not check the camera; look at the video camera” brought the negated camera back into the result.

No unauthorized reads or SQL write attempts were observed in that run, and all nine fact tables remained unchanged. Those witnesses did not make the wrong query branches correct. The experiment also retained cases in which the model plan was correct and the product's final type was wrong, showing that deterministic fallback can itself become a source of semantic contamination.

The later [capability contract v2](https://github.com/NoctilumeDev/dome/blob/dbb32160a811fd06c826a8d9eafbc660a0548219/qingye/docs/assistant-contract.md) stopped using local rules as a second general Chinese-language interpreter. The model proposes a finite plan, local code validates capability, and personal-scope queries first display the actual execution scope. The [new comparison](https://github.com/NoctilumeDev/dome/blob/dbb32160a811fd06c826a8d9eafbc660a0548219/qingye/docs/semantic-repair-20261008.md) still observed mistakes involving public-query objects, time, and omitted conditions.

Scope confirmation can prevent private records from being read before consent and give the user a correction point. It cannot prove that the model understood the original request. Agreement between two models cannot prove condition completeness either. Safety containment, task utility, and semantic correctness require separate accounting.

This establishes a bounded counterexample, not a unified theory of drift for every natural-language system and not a completed result from AlgorithmResearchLab.

## A fallback is not an oracle

Conventional software can use retries, idempotency, compensation, and eventual consistency to bring a failed state transition back within its contract.

Those mechanisms remain important. They answer:

> How should a predefined state machine recover?

They do not automatically answer:

> Did the agent understand the task correctly in the first place?

The inversion can be worse: the AI result may be right, while a deterministic fallback built on the wrong semantic premise compensates the correct result into an incorrect one.

The system cannot treat conventional code as truth and AI as risk by definition. Both need explicit fact ownership, contracts, and evidence; their failure shapes are different.

## Two routes, both requiring explicit authority

One route confines the agent to observation and proposals: no Create, Delete, or Update, only Read and candidate actions. This sharply reduces direct damage, but downstream systems still cannot promote its report into fact without qualification.

The other route delegates bounded authority: the agent may act only on explicit objects, with explicit operations, conditions, resources, attempt identity, and expiry. The useful question is not whether “AI has permission,” but whether the system can state precisely:

```text
which objects it may affect
which operations it may perform
under which conditions
when the authority expires
who observes the result
which evidence supports which conclusion
```

The hard part of the second route is the information gap. The agent interprets the task from its context; the user cannot inspect how that judgment was formed, and the system cannot promote the agent's account of its own intention into engineering fact.

The practical response is not to pretend that this gap can disappear, or to demand a persuasive-looking internal rationale. It is to externalize what must be constrained and observed:

```text
human seals objective, constraints, and forbidden effects
-> agent proposes exact objects, actions, and expected effects
-> policy issues a minimal capability for this attempt
-> source system executes or observes the actual action
-> evidence records inputs, path, effects, and gaps
-> independent qualification states only what the evidence supports
```

An explanation may help propose an action, but it cannot authorize itself. Self-report may become a claim to check, but not its own proof. Missing information should narrow authority, stop execution, or request human input. New evidence may rewrite the next plan; it must not silently widen the current attempt.

The information gap never reaches zero. The system can make it visible, bounded, revocable, attributable, and independently reviewable. That is why the four research lines can each own part of the problem without any one of them pretending to be the complete answer.

Distributed services, microservices, high concurrency, synchronous and asynchronous coordination, decoupling, lifecycle, and consistency compound these questions. They are additional system dimensions, not solved capabilities merely because this note names them.

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

| Research line | Question | Authority it does not acquire |
| --- | --- | --- |
| [Drift Algorithm / AlgorithmResearchLab](https://github.com/NoctilumeDev/AlgorithmResearchLab) | While objective and proxy definitions remain fixed, does the proxy still support decisions for that objective? | It contains research preparation only and remains `RESEARCH_NOT_STARTED`; objective substitution, obligation substitution, and derivation gaps are adjacent candidates, not an implemented detector |
| [FlowKernel](https://github.com/NoctilumeDev/FlowKernel) | How might OS-level trust semantics constrain unreliable policy through capabilities, resources, revocation, recovery, and provenance? | Implementation does not yet exist; a research plan is not a capability |
| [JPyxis](https://github.com/NoctilumeDev/JPyxis) | How is computation defined, invoked, executed, and explained across lifecycle and failure? | Host resource authority, business truth, or verdict authority |
| [VeriTrail](https://github.com/NoctilumeDev/VeriTrail) | How do observations, evidence, and claims obtain deterministic bounded qualification? | Source-system truth, execution authority, or final human disposition |

The four CRUD verbs and the four research lines are not a one-to-one mapping. The verbs describe what the system may do; the research lines separate ownership of objective and proxy, authorization and resources, computation and lifecycle, and evidence and verdict. These boundaries can stand independently and may later compose through versioned contracts. Composition does not merge authority: evidence does not act for the execution layer, execution does not grant itself wider authority, and authority cannot certify that the real-world outcome is correct.

[MiniLinux](https://github.com/NoctilumeDev/MiniLinux) remains a bootable and debuggable reference laboratory for classic operating-system mechanisms. It is not a fifth research line, FlowKernel, or a Linux-compatible implementation.

## Research hypothesis

Operating systems used abstraction and isolation so applications did not need to bind themselves directly to particular hardware.

When intelligence becomes a replaceable, fallible, and active capability, another system boundary may be useful:

> **Software should not have to surrender its goals, state, authority, and responsibility to one specific AI.**

Models may change. Agents may change. Runtimes may change. CPUs, GPUs, and NPUs may change.

The software's own goals, state, and responsibility should not drift with them.

For now, these properties should be tested above existing operating systems. A primitive belongs lower only after retained counterexamples show that user-space mechanisms cannot establish the required property correctly.

The question may be large. The conclusion still belongs to evidence.
