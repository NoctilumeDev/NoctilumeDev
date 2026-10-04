# Protecting Zero: From Generated Answers to Qualified Facts

> **Chinese source edition:** [archived 20-page PDF at `NoctilumeDev-ZH@7997b43`](https://github.com/NoctilumeDev/NoctilumeDev-ZH/blob/7997b43c7767e9f6cc6546046c2c7475a49de347/docs/protecting-zero-from-answer-to-fact.pdf)
>
> This English edition is a GitHub-native publication, not a page-for-page reproduction. It preserves the argument, central equations, evidence boundaries, and limitations of the source while editing the structure for web reading.

> **A model can produce an answer. It cannot own a fact.**

## Answers Are Cheap. Facts Need Qualification.

One of the most common reassurances in discussions about generative AI is:

> The model may be wrong, but a human makes the final decision.

That sentence compresses a hard reliability problem into a comforting division of labor: the model produces; the human judges.

The problem is that a person does not acquire epistemic privilege merely by standing at the end of a workflow. The original goal may have been defined incorrectly. The reviewer may see only a polished summary. The inspection may be infrequent, low-bandwidth, and highly correlated with the assumptions that produced the mistake.

The dangerous case is not a visibly broken answer. It is a complete, internally consistent, professionally explained wrong world.

A model can implement the wrong objective well. Tests can prove that the implementation satisfies the wrong contract. A reviewer can honestly confirm that the code and contract agree. Every local step can look correct while the whole system remains wrong.

That is the question behind protecting zero:

> When the goal definition, implementation, tests, and review can all contain noise, what gives an engineering claim the right to become a fact?

Not fluency. Not completion. Not a green check by itself. A claim becomes qualified only through evidence that does not depend entirely on the claim's own story: database state, browser behavior, runtime state, Git objects, release bytes, repository rules, or reproduction in an unfamiliar environment.

## The First Error Changes the Rest of the Problem

Suppose human goal definition, model implementation, and final validation were independent, and each were correct half the time. The probability that all three were correct would be:

```text
P(final correct) = 0.5 x 0.5 x 0.5 = 0.125
```

That is already poor. Reality is usually worse because the stages are not independent.

A more honest sketch is:

```text
P(S) = P(H) x P(M | H) x P(V | H, M)
```

Here, `H` is the human's problem definition, `M` is the model's implementation, and `V` is validation. If the real requirement is `B` but the human defines `A`, the model never receives `B`. A strong model may implement `A` beautifully. A reviewer in the same context then asks whether the result matches `A`, not whether `A` describes reality.

The first error is therefore not one independent disturbance among several. It changes the conditional space in which the later stages operate.

A 95-point agent given the wrong goal may not produce a 95-point project. It may produce a 95-point implementation of the wrong goal.

When implementation, tests, and review all inherit the same premise, greater capability can make the mistake harder to dislodge.

## Human Review Is Another Probabilistic Node

Let:

- `e` be the model's error rate;
- `d` be the probability that a human notices an error;
- `c` be the probability that the human corrects it without introducing another error;
- `m` be the probability that the human damages an originally correct result.

A deliberately simple post-review error rate is:

```text
E_final = e(1 - dc) + (1 - e)m
```

For human intervention to have a net benefit, at minimum:

```text
e x d x c > (1 - e)m
```

These variables were not measured as universal constants. The equation exists to reveal an information structure, not to pretend that judgment has been reduced to a theorem.

It shows why “a human checked it” is not enough. Judgment is not one atomic ability. It includes detection, localization, correction, avoiding collateral damage, independence from the original premise, and the ability to stop.

If any one of those approaches zero, “human oversight” may be only one more probabilistic step.

## The Sticky Wrong World

Consider a minimal two-state model:

- `C`: the system's current belief still agrees with reality;
- `W`: the system has entered a wrong world;
- `alpha`: the probability of moving from `C` to `W`;
- `beta`: the probability of genuinely returning from `W` to `C`.

```text
P = [[1 - alpha, alpha],
     [beta, 1 - beta]]
```

When the generator, test author, and reviewer share the same context and premise, `W` becomes approximately absorbing:

```text
P(W -> W) ~= 1
```

In the simplified time-homogeneous model, when `alpha + beta > 0`, the long-run probability of remaining in the wrong state is:

```text
pi_W = alpha / (alpha + beta)
```

Most model improvement focuses on lowering `alpha`: make fewer mistakes.

That matters. But as long as `alpha` is not zero, a reliable engineering system must also raise `beta`. It must preserve a path back to reality after the wrong world has already become coherent.

This is why external facts matter more than repeated self-review. A database, browser, runtime, fresh clone, release artifact, or Git object is not valuable because it is “smarter.” It is valuable because it does not completely inherit the current narrative. It introduces a new observation into the transition from `W` back to `C`.

## Human in the Loop Is Not the Same as Human With Evidence

The effective probability of human correction can be sketched as:

```text
beta_human ~= r x d x c x i
```

where:

- `r` is how often a person actually inspects the work;
- `d` is the chance of detecting the error;
- `c` is the chance of correcting it;
- `i` is independence from the premise that caused it.

If the same person defines the wrong requirement, asks the model to implement it, and later reviews the result against that requirement, `i` may be close to zero.

The issue is not that the human is less intelligent than the model. The correction channel has acquired no new information.

Different review structures provide different kinds of independence:

| Review structure | Relation to the generating narrative | Primary value | Boundary |
| --- | --- | --- | --- |
| Same model, same context | Extremely high correlation | Finds surface omissions quickly | Easily reinforces the shared premise |
| Same model, fresh context | High correlation | Reduces path dependence | Still shares model priors |
| Different model, same artifact | Medium correlation | Adds cognitive variance | May share training-data bias |
| Deterministic tests | Lower correlation | Recomputes explicit contracts | Proves only the assertions that exist |
| Database / browser / runtime | Lower again | Reads the world after action | The observation tool can also be wrong |
| Fresh clone / release | Lower again | Removes private paths and local residue | Depends on complete public assets |
| Unfamiliar user / external environment | Among the lowest | Introduces real environmental variance | Expensive and still not an oracle |

Human-in-the-loop is not a reliability proof.

Human-with-independent-evidence-in-the-loop can be a meaningful correction mechanism.

## A Generative Amplifier Can Invent a Positive Number

If a person's useful knowledge is `X`, a pure amplifier might be written as:

```text
Y = gX, where g > 1
```

Positive knowledge grows. Negative knowledge grows. Zero remains zero.

A language model is not a pure amplifier. It also generates from learned priors and current context:

```text
Y = gX + epsilon
```

When `X = 0`, the output is not necessarily zero. It is `epsilon`.

When a user knows nothing about a domain, the model does not naturally preserve the blank space. It fills it. That first completion may become the user's new prior. The next prompt then contains it as an assumption, and the model sees its own earlier completion reflected back as context.

The system has turned zero into a direction.

This is why truth and confidence must be treated as different coordinates:

```text
T = truth / correctness
K = confidence / coherence
```

The most dangerous failure is not always low `T`. It is low `T` combined with high `K`:

```text
T ~= 0, K >> 0
```

The answer is structured. The vocabulary is correct. The explanation is smooth. The code may even run locally. Nothing in that presentation proves that the underlying claim became true.

This is a false positive in the literal sense: truth did not rise above zero, but confidence did.

## Protect Zero: Let UNKNOWN Remain UNKNOWN

Generative systems tend to eliminate intermediate states. Given a context, they produce the next plausible continuation. “I do not know” is usually a trained, rewarded, or contractually required behavior, not the natural terminal state of generation.

Unless the system rewards abstention, requires tool use, or fails closed when evidence is missing, `UNKNOWN` is easily compressed into a plausible completion.

Protecting zero means refusing that compression.

It also requires two axes that are often collapsed into one.

### Epistemic state

This axis asks whether a claim has obtained factual qualification:

```text
UNKNOWN
-> UNVERIFIED
-> VERIFIED / REFUTED
```

- `UNKNOWN`: no stable claim has been established.
- `UNVERIFIED`: a candidate claim exists, but evidence is insufficient.
- `VERIFIED`: evidence qualifies the claim inside a declared boundary.
- `REFUTED`: evidence contradicts the claim.

### Run or qualification verdict

This axis asks how one engineering attempt ended under its contract and resource boundary:

```text
PENDING / PASS / FAIL / INCONCLUSIVE / BOUNDARY
```

These axes are not interchangeable.

`BOUNDARY` and `INCONCLUSIVE` explain why a run cannot support a stronger conclusion. They are not epistemic states. A resource boundary cannot be converted into truth or falsehood. A model claim begins as `UNVERIFIED`; it cannot jump directly to `VERIFIED` because it sounds complete.

An acceptance workbench forcibly recreates zero:

```text
model claim
-> UNVERIFIED
-> independent evidence
-> VERIFIED / REFUTED
```

Its most basic capability is not always producing an answer. It is preserving “not yet known” until evidence arrives.

## Independence Matters More Than Repetition

Let `rho` represent the correlation between the errors of a generator and a verifier. Ten checks do not imply ten independent observations. Ten reviews by the same model, in the same context, under the same assumption may be one hidden premise repeated ten times.

One reliability objective is therefore:

```text
rho decreases; beta increases
```

A fresh reviewer is not valuable because it is necessarily smarter. It is valuable because it does not know why the previous agent believed itself.

It cannot inherit the generator's self-evaluation, repair rationale, or sunk cost. It sees frozen code, the original contract, and executable counterexamples. Information isolation restores some independence.

The same principle applies across engineering layers:

| Layer | Scope | Core question |
| --- | --- | --- |
| L1 | Source / contract | Do code, documentation, state, and version coordinates agree? |
| L2 | Build / test | Did builds, tests, static gates, and declared checks actually execute? |
| L3 | Runtime / business | Do database, queue, and final business states exist? |
| L4 | Browser / observation | Do DOM, Network, Console, and visible behavior match the claim? |
| L5 | Failure / recovery | Do failure, degradation, recovery, idempotency, and reconciliation hold? |
| L6 | Artifact / release | Do public bytes, hashes, and out-of-repository first runs agree? |
| L7 | Repository governance | Are PR rules, required checks, rulesets, Pages, and tags effective? |
| L8 | Cleanup / reproducibility | Are residues removed, protected data preserved, and fresh runs repeatable? |
| L9 | Public presentation | Can an unfamiliar reader identify role, state, boundary, and entry point? |

These layers reinforce one another. They do not substitute for one another.

Green GitHub Actions do not prove browser behavior. A browser pass does not prove branch protection. Repository governance does not prove runtime truth. Public readability does not replace any of the first eight layers.

No evidence outside the declared boundary is not the same as failed evidence. Claiming that an unobserved boundary has been verified is the failure.

## Two Systems Around a Probabilistic Core

An acceptance workbench and an execution substrate answer different questions.

The workbench asks:

> The AI says the task is complete. What did the world actually become?

The execution substrate asks:

> While the AI was acting, what could it access, what did it execute, which resources did it consume, which state did it modify, and what provenance did it leave?

Placed around a probabilistic model, the two systems reduce the authority of self-reporting.

```text
probabilistic cognition
+ deterministic execution
+ persistent state
+ external verification
```

The lower layer records action, capability, target, resource, provenance, and recovery. The upper layer observes the world after the action and judges the frozen claim against its contract.

This does not eliminate hallucination. It removes hallucination's automatic right to become system fact.

The model may believe that two orders exist. The workbench can execute `SELECT COUNT(*)`, retain the result, and qualify a bounded claim. Those are different events.

## Deterministic Does Not Mean Correct

With fixed weights `W`, input `x`, tokenizer, inference implementation, and greedy decoding, model inference can be approximated as:

```text
y = f_W(x)
```

The same input may produce the same output every time. A function can still be consistently wrong.

The real problem is not:

```text
input -> deterministic output
```

It is:

```text
reality -> correctly qualified claim
```

Determinism supports repeatability. It does not establish correspondence with reality.

Closed-world components remain essential. Database transactions, type systems, state machines, symbolic solvers, and deterministic executors can give strong answers inside explicit contracts. Open-world understanding still contains ambiguity: the requirement may be wrong, the image may depend on context, the business decision may have no unique answer, and an intermittent failure may lack a reproducible scene.

The more realistic architecture is mixed:

- neural models interpret ambiguity and generate candidates;
- persistent world state retains facts beyond one context window;
- symbolic mechanisms process explicit rules;
- deterministic executors perform bounded computation and state transition;
- external verifiers observe consequences.

Intelligence cannot simply be replaced by a function. Its outputs can still pass through functional constraints before becoming facts.

## Honest Boundaries Are Part of the Result

A controlled single-host environment can prove real processes, database behavior, message paths, bounded failure recovery, release artifacts, and representative multi-process competition. It cannot silently become evidence for multi-node, cross-zone, or internet-scale availability.

One of the source cases made this boundary physical. A full PlainJournal topology could start, but seven core middleware components and eight business JVMs left a 16 GiB host with only 0.46 GiB of free physical memory.

Continuing through swap would not have “completed the test.” It would have changed the experiment.

The honest result was a host-capacity boundary, not a product `PASS` or `FAIL`.

That distinction generalizes:

| Capability claim | Defensible first-stage state | Forbidden promotion |
| --- | --- | --- |
| Single-host execution | `VERIFIED` | Production-grade global execution platform |
| Multi-process concurrency | `VERIFIED / BOUNDARY` | Cross-node high availability |
| Failure / recovery | `VERIFIED` inside the contract | All failure modes covered |
| Distributed protocol interfaces | `DESIGNED` | Multi-node operation exists |
| Multi-node operation | `NOT YET VERIFIED` | Assumed by default |
| Region HA / internet scale | `NOT PROVEN` | Replaced by single-host evidence |

Stopping is not the absence of engineering. Sometimes it is the most truthful engineering action available.

## What This Argument Does Not Prove

This model has sharp limits.

First, the two-state Markov chain is explanatory. Real systems contain unknown, partly correct, conflicting, resource-aborted, and out-of-contract states. Transition probabilities vary with time, task, model, and environment.

Second, the variables in the equations above were not estimated as population parameters. The numerical examples expose structure; they do not establish universal rates.

Third, external evidence is not an oracle. Browser automation can corrupt input. A database query can point at the wrong instance. A release can disagree with its tag. A verifier can contain blind spots. Evidence still needs coordinate binding, cross-checking, and reproducible records.

Fourth, protecting zero increases latency and refusal. In a low-risk, one-off creative task, a heavy fail-closed chain may cost more than it saves. Gate strength should follow claim strength, consequence, and reversibility.

Fifth, this argument neither solves AGI nor proves one inevitable AI operating-system architecture. Execution constraints and acceptance workbenches reduce the probability that error becomes incident. They do not eliminate uncertainty in an open world.

## Conclusion

“The model may fail, but a human will catch it” is not a general reliability strategy. It assigns humans an epistemic privilege they do not automatically possess.

A mature system does not pretend that it will never enter the wrong state. It makes the wrong state difficult to preserve.

It lowers `alpha`, but it also raises `beta`.

It builds escape routes from coherent error: database reads, browser observation, runtime facts, Git objects, release artifacts, unfamiliar readers, and governance readback. Their value is not that they are infallible. Their value is that they repeatedly pull the system away from self-contained narrative and back toward the world.

A generative model also carries `epsilon`. When the user knows nothing, the model can fill the blank with a fluent false positive. Trusted systems must therefore protect zero. `UNKNOWN` must be allowed to remain `UNKNOWN`; `UNVERIFIED` must not become `VERIFIED` until evidence earns the transition.

The goal is not a model that never hallucinates.

The goal is a system in which hallucination does not automatically acquire the status of fact.

> **A model can produce an answer. It cannot own a fact.**
