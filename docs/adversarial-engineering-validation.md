# Adversarial Engineering Validation: Making “Done” Survive Its Author

> **Chinese source edition:** [exact Markdown guide at `NoctilumeDev-ZH@7997b43`](https://github.com/NoctilumeDev/NoctilumeDev-ZH/blob/7997b43c7767e9f6cc6546046c2c7475a49de347/docs/adversarial-engineering-validation.md)
>
> This English edition is a GitHub-native publication. It incorporates the source guide's later Qixu practice update without rewriting the archived 19-page Chinese PDF.

This is not a security red-team report.

It is not a slogan about “testing harder,” either.

It asks a narrower and more uncomfortable question:

> **Can a project still explain what is true after it loses its author, its conversation, and its original workspace?**

Adversarial engineering validation deliberately weakens the author's advantage. It looks for attributable counterexamples, separates product defects from validation pollution, and prevents a polished completion story from acquiring more authority than the evidence beneath it.

The objective is not to make every repository green.

The objective is to know why a claim may survive.

## The Goal Is Not to Prove Yourself Right

Project closeout easily becomes a celebration pipeline:

```text
tests pass
-> CI turns green
-> README says "complete"
-> archive
```

The problem is that tests, CI, documentation, and the author's explanation may all share one mistaken premise. A system that can only produce `PASS` behaves more like a celebration machine than a validation system.

A better objective is:

> Give the project enough room to expose itself, then require every conclusion to remain inside what was actually observed.

The ideal result is not a row of identical green badges. It is a reviewable state map:

```text
PASS
PASS WITH BOUNDARY
REFUTED
PLANNED / DEFERRED
NOT APPLICABLE
INCONCLUSIVE
NOT PROVEN
```

A red result may be retained. A boundary may be the correct conclusion. Deferral may be honest engineering.

What is not allowed is turning an unobserved capability into an established fact.

## What This Method Is Not

### It is not another name for Chaos Engineering

Chaos Engineering usually injects infrastructure faults into a running system and observes resilience and recovery.

Adversarial engineering validation has a wider attack surface. Code, claims, validators, release artifacts, repository governance, host resources, automation, and the operator can all contaminate the result.

### It is not a deep security scan

Security is one validation domain, not the whole method. An unreviewed attack-path scan does not become mandatory merely because “more testing” sounds rigorous. Expanding scope can reduce the clarity of the original experiment.

### It is not one gate copied into every project

A teaching framework, a static narrative site, a monolithic business system, a distributed reference baseline, a planned repository, and a validation tool do not share one contract.

The review questions can be common. The YAML, test count, evidence shape, and acceptable terminal state should not be forced into symmetry.

### It is not a theoretically complete verifier

A verifier needs to be reliable inside the project's declared input and content boundary.

If a static-work repository accepts only a finite HTML form under its own control, it does not need to reimplement half a browser parser to handle every malformed edge of HTML5. Once the contract is established, stopping is allowed.

## Bind Before You Observe

An attributable validation attempt needs at least four fixed coordinates.

1. **Object under review** - use an exact commit SHA, not a moving `main` branch as identity.
2. **Validation contract** - define `PASS`, `FAIL`, `BOUNDARY`, and `INCONCLUSIVE` before the final result is known.
3. **Verifier version** - the rules and the object cannot both drift during one final run.
4. **Host assumptions** - memory, Docker, WSL, ports, browsers, databases, and background tasks belong in the record.

An exact SHA answers “which bytes are we discussing?” It does not prove that those bytes will remain obtainable.

Public review may also require a durable ref, Release asset, or bundle. Offline recovery may require a carrier hash and a real clone or extraction result.

Identity, availability, and reproducibility are related. They are not the same property.

## The Nine-Layer Fact Chain

The validation chain I use separates nine evidence surfaces:

| Layer | Object | Core question |
| --- | --- | --- |
| L1 Source / Contract | Code, documentation, version, state | Do the claim and implementation describe the same reality? |
| L2 Build / Test | Build, unit tests, static gates | Did the public command really execute with clean dependencies? |
| L3 Runtime / Business | API, database, message queue, final state | Did the business facts actually close? |
| L4 Browser / Observation | DOM, Network, Console, viewport | What did a user really see and trigger? |
| L5 Failure / Recovery | Fault, degradation, idempotency, recovery | Did the system and its facts return to an allowed state? |
| L6 Artifact / Release | Wheel, ZIP, tag, Release, hash | Does the public artifact survive outside the author's workspace? |
| L7 Repository Governance | PR, required checks, ruleset, Pages | Who can write what into the main line, and what is remotely enforced? |
| L8 Cleanup / Reproducibility | Process, port, volume, temp path, fresh clone | Can the experiment be repeated, and did cleanup preserve owned data? |
| L9 Public Readability | Profile, repository front page, links, mobile view | Can an unfamiliar visitor identify role, boundary, and evidence entry point? |

These layers complement one another. They do not substitute for one another.

Green GitHub Actions do not prove browser interaction. A browser pass does not prove that `main` is protected. A valid source checkout does not prove that a public Release contains those bytes.

> **A successful workflow is an execution fact. A required check is a governance fact.**

## Classify the Failure Before You Repair It

A failed observation can belong to several different classes:

| Class | Example | Correct response |
| --- | --- | --- |
| Product defect | A producer creates an invalid physical binding | Fix the product cause, then rerun the original contract |
| Validation defect | A verifier ignores authoritative content or permits disguise | Narrow authority or repair validation logic |
| Validation pollution | Automation, Origin, stale cache, or operator behavior changes the experiment | Repair the validation condition; do not weaken the product for the tool |
| Host failure / boundary | Memory, Docker, WSL, or ports violate prerequisites | Stop, record, recover one variable, or defer |
| Governance gap | A check exists but is not required; a tag has no durable carrier | Use an independent governance track; do not call it a product bug |
| Claim / gate mismatch | README promises something the workflow never observes | Withdraw the claim or obtain real evidence |

Classification happens before construction.

Otherwise, a team can “fix” a correct fail-closed contract merely to satisfy a polluted test.

This is one of the easiest ways for validation to damage the thing it was supposed to protect.

## Independence Is an Information Structure

A reviewer without context is not automatically more intelligent.

Its advantage is that it does not know why the builder thought the work was correct. It does not inherit the amount of effort already invested or the explanation written to justify the current state.

A minimal serial separation looks like this:

```text
A - discover
read public artifacts only; freeze findings

B - construct
fresh clone; reproduce each finding; repair only what survives

C - review again
read the repaired public object; do not inherit A/B self-evaluation
```

Two additional rules matter:

- A finding from an unfamiliar reviewer still needs evidence. Independence does not grant infallibility.
- Do not begin construction in the next repository while the current repository remains open. Shared host and Git state can cross-contaminate conclusions.

The point is not theatrical separation of roles. It is reducing correlated error.

## A Single Variable Beats a Beautiful Explanation

When a failure may come from the host or validation tool, prefer a reproducible contrast:

```text
same code
same test
same threshold
same data

change one prerequisite
-> does the original failure disappear as predicted?
```

One contrast supports a hypothesis. It does not have to declare a universal root cause.

If timing, residue, or random initialization may interfere, alternate the conditions:

```text
A -> B -> A -> B
```

The useful evidence chain is not “it passed later.” It is:

```text
first failure retained
-> prerequisite stated
-> one variable changed
-> original path rerun
-> final state read back
```

The first red result stays.

Together with the recovery, it proves that the system knows when it should not pass.

## Test Failure Mechanisms, Not an Infinite Matrix

Counterexample design should not begin with “which endpoint can we test next?”

Start by reconstructing the fact chain promised by the project:

```text
claims and rules
-> fact owner
-> state transition and durable commit
-> page / message projection
-> failure recovery and public delivery
```

Then identify a small number of invariants that must be unique, atomic, monotonic, recoverable, or protected from unauthorized action.

Choose counterexamples that touch those invariants directly.

The unit of coverage is the failure mechanism, not the number of injection points. High-value seams usually sit around identity, authority, time, transactions, recovery, external dependencies, and ownership of visible state.

Critical single failures need representative witnesses. High-risk intersections should be tested only when a combination can reveal new information. Enumerating every route, fault point, and scheduler ordering produces an infinite matrix, not necessarily stronger evidence.

A finding that deserves to affect the conclusion should bind at least:

- exact source and contract;
- a normal control;
- the smallest action or schedule that exposes the issue;
- an independently derived expectation;
- the original failure artifact;
- failure classification;
- the smallest repair;
- a rerun under the original condition;
- remaining boundaries.

Evidence should read the invariant itself.

- An algorithm should be checked against an independent reference model.
- A transaction should be checked through final database state and response semantics.
- An authority decision should be derived from current identity and scope facts.
- A page should be checked through actor, request source, and server-owned state.

The test must not call the implementation under test to generate its own expected answer.

## Mechanism Attack and Product Review Have Different Jobs

Representative mechanism attacks establish defenses, repair actual defects, and record unknowns.

Independent technical reviewers challenge the critical claims of a fixed candidate without inheriting the builder's completion narrative.

Independent product reviewers use the real interface and ask different questions:

- Can the user find the entry point?
- Is the current actor and object clear?
- Does feedback explain the legal next action?
- Does recovery return to the right context?
- Can the user understand why the system made this decision?

These roles are related, but they are not interchangeable.

The number of agents does not create qualification. A reviewer who only reads another agent's screenshots must say that it did not perform the interaction itself.

The Qixu source named two local phases `M7` and `M8`. Those identifiers belong to Qixu. Other repositories may reuse the questions, evidence discipline, and stopping rule. They do not inherit Qixu's business rules, test counts, collectors, or completion status.

This is a method upgrade, not a new universal stage system.

## When to Stop Expanding

Expansion can stop when:

- major failure mechanisms have representative counterexamples;
- critical invariants have direct evidence;
- in-scope core defects have been repaired and rerun;
- remaining findings and unknowns have explicit disposition and reentry points.

A later finding should reopen the smallest relevant boundary only when it introduces:

- a new failure mechanism;
- a new fact owner;
- a new state-machine conflict;
- a counterexample to an earlier proof;
- materially higher risk.

Another permutation of a known mechanism can be handled as an ordinary defect. “Zero defects” is not a useful exit criterion.

## What the Repositories Actually Taught

### Qixu: defenses and product comprehension need separate review

Qixu's mechanism attacks exposed several different classes of failure: a fixed scan window that could not guarantee progress, adjacent deadline phases that were treated as identical, DTO coordinates that blurred versions, cross-subject cleanup side effects, and an old page continuation contaminating a new actor.

Independent review of the fixed candidate then found a different problem. An unknown facility state could be projected as `false`, and some feedback did not tell the user which object or legal basis produced the decision.

The transferable lesson is not the defect list.

It is the two-layer responsibility:

1. attack facts and state invariants with representative mechanism counterexamples;
2. separately verify whether those defenses remain understandable through the real product.

The exact source method is retained in [Qixu at `036a167`](https://github.com/NoctilumeDev/Qixu/blob/036a16741332be878771ce1ecb3d661b346a2676/docs/testing-methodology.md). Reading that method is not authorization to begin construction elsewhere.

### VeriTrail: the verifier rejected its own artifact

A public wheel generated a demo outside the repository. Its Catalog recorded an absolute Artifact root in a staging directory. After an atomic move to the final directory, content identity remained unchanged, but the physical binding became stale.

The official `catalog-serve` command correctly failed closed with `ARTIFACT_ROOT_MISMATCH`.

The repair did not weaken the verifier. It changed the producer so the binding was established in the final location. Public wheel and sdist paths were then rerun through both the positive chain and the illegal-move negative chain at [`f50d5e1`](https://github.com/NoctilumeDev/VeriTrail/commit/f50d5e1abfc8fc052a36a5be1d5e09047625ebbf).

A validation tool does not become mature by always passing its own output.

It becomes mature when it can reject its own invalid artifact.

### InkNarratives: a passing gate did not see all authoritative content

A static fingerprint once covered only a limited content surface, while visible pages and public claims exceeded what the gate actually observed.

Unfamiliar reviewers added counterexamples through comments, scripts, templates, and attribute disguises. The final contract was deliberately narrowed to the repository's allowed HTML form rather than expanded into a general HTML5 parser.

The literary field `content-revised` represents the revision date of the work, not the modification date of validator code. Engineering activity does not own the right to rewrite a literary fact.

The retained public coordinate is [`56ad434`](https://github.com/NoctilumeDev/InkNarratives/commit/56ad434c66bc3aa7d8835823b39ffb5720c93c2b).

### DarkRoomLibrary: the observation tool and Origin can contaminate the experiment

A browser login repeatedly returned 403. The backend, Nginx, captcha flow, and Redis all became suspects.

The Network response eventually showed that the request used `http://127.0.0.1:5175`, while the public contract allowed `http://localhost:5175`.

The two addresses feel similar at the TCP layer. They are different Origins in browser CORS semantics.

The positive rerun under the correct Origin, together with rejection of the out-of-contract Origin, proved that CORS enforcement was real. This was a validation-environment mismatch. Modifying the product to accommodate the reviewer's address habit would have destroyed useful evidence.

A separate product finding involved password input: external input had no explicit length cap, while validation performed multiple regex scans. The repair added a bound and a linear classification pass, then completed release readback at [`b83ba4e`](https://github.com/NoctilumeDev/DarkRoomLibrary/commit/b83ba4ed858141e4e66afbea7d6ddff642fb5bd8).

Different classifications led to different actions.

### PlainJournal: a future 32 GiB result cannot erase the 16 GiB boundary

The full core topology started, but a 16 GiB host was left with roughly 0.46 GiB of free physical memory.

Continuing through the pagefile would have changed the experiment. The retained conclusion was:

```text
INCONCLUSIVE / HOST CAPACITY BOUNDARY
```

A post-upgrade runbook exists for the Core Smoke, representative three-instance services, concurrency steps, and failure recovery on 32 GiB. At the source coordinate, that work remained `PLANNED / DEFERRED`.

A later success would not rewrite the earlier boundary. The two results would stand side by side: 16 GiB proves the former host limit; 32 GiB may establish a different capability under a different prerequisite.

### MiniSpringBoot: stopping can be a validation result

One archive review kept expanding through transactions, connection pools, HTTP, JSON, and CI hardening. Every commit had a local justification. Collectively, the goal had drifted from “freeze a teaching project” to “continue building an industrial framework.”

The hardening experiment and CI candidate were preserved as public history rather than merged wholesale into the teaching `main`.

One equivalence-claim correction at [`0596a6e`](https://github.com/NoctilumeDev/MiniSpringBoot/commit/0596a6e4247b65a705f3211575e21ee1f9cca428) survived independent fact review and entered the main line separately as [`6f4a49b`](https://github.com/NoctilumeDev/MiniSpringBoot/commit/6f4a49b59c606d63fd2b55bcdad6d99c03495a1f).

The lesson is not only how complexity grows.

It is when sunk cost should lose authority.

## Resource Discipline on a 16 GiB Host

Limited resources are not an embarrassment to hide. They are part of the experiment:

- high-load repositories run serially;
- background applications, browser tasks, Docker, and WSL enter the host snapshot;
- crossing a repository stop line does not authorize a lower threshold, a skipped browser, or a swap-powered green result;
- when background activity may affect the conclusion, the resource-sensitive run is repeated on a clean host;
- Git identity, fixed hashes, and static contracts can be evaluated separately from memory-sensitive execution.

This does not blame product failures on the host or host failures on the product.

It requires each conclusion to carry its own conditions.

## Converge the Repair Set

After discovery, adjudicate the findings together instead of repairing whatever appeared most recently.

1. Reproducible violations of the public contract enter the smallest construction set.
2. A valid root cause with an overgrown implementation is narrowed before reconsideration.
3. Work that is merely prettier, more generic, or theoretically complete is deferred or rejected.
4. Governance, host, and validation-tool issues remain on their own tracks.
5. Repairing a producer does not authorize weakening a correct verifier.
6. The repaired candidate reruns positive, negative, recovery, and cleanup readback.

Rigor is not measured by how much code changes.

Rigor means that the conclusion does not exceed the evidence, and that prior effort does not argue a patch into the main line.

## A Practical Definition of Done

Before a repository enters a long freeze, it should be able to answer:

- What is it, and what is it explicitly not?
- Do the exact code, public ref, and Release identify the same object?
- Can a fresh checkout execute the declared minimal path?
- Who owns the final business fact?
- What do the browser, database, middleware, and repository governance each prove?
- Was the first failure retained, and did recovery change one principal variable?
- Which capabilities are `VERIFIED`, and which remain `BOUNDARY`, `DEFERRED`, or `NOT PROVEN`?
- Were temporary processes, ports, images, directories, and volumes reconciled against ownership before cleanup?
- Can a visitor without development history find the right identity, boundary, and entry point?

The last question is L9. It is not decorative.

If a first-time reader cannot distinguish a teaching baseline, a planned repository, a frozen reference, and the current main line, the first eight layers can still be misunderstood.

## Conclusion

This method sits downstream of [Protecting Zero](protecting-zero.md).

Protecting Zero asks why a generated claim does not become fact by default.

Adversarial engineering validation asks what to do next:

```text
bind the object and contract
-> search for counterexamples that touch real invariants
-> preserve the first failure
-> classify before repair
-> rerun under the original condition
-> obtain independent product readback
-> stop when the evidence boundary closes
```

The shared conclusion is not that stronger AI is always better, or that a human glance at the end is enough.

> **Strong models determine the ceiling of capability. Engineering institutions determine where that capability is allowed to act. Independent facts determine whether the result deserves to be believed.**

The honest closing sentence is not:

> Everything is green.

It is:

> **Now we know why we are allowed to stop.**
