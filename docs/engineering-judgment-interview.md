# Engineering Judgment

[中文版本 / Chinese source edition](https://github.com/NoctilumeDev/NoctilumeDev-ZH/blob/37daa83b37918210561f8fe69ccb0ee9a72cdb79/docs/engineering-judgment-interview.md)

Technical interviews have started to feel increasingly pointless to me.

Most “scenario questions” are just rote questions wearing better clothes.

They used to ask:

> What are microservices?<br>
> Which components belong to Spring Cloud?<br>
> How do you understand CAP?

Then everyone memorized those answers, so the questions were upgraded:

> How would you split an e-commerce platform into microservices?<br>
> How would you design a food-delivery system?

Sounds more advanced.

It is still rote memorization.

Order service. Payment service. Inventory service. User service. Coupon service. Message queue. Redis. Distributed lock.

A well-prepared candidate even knows where every box belongs on the architecture diagram.

Boring. 😂

If I were the interviewer, I would be a little meaner.

---

## The Question Itself May Be Wrong

I would ask:

> **I am building an operating system for resource allocation. If I want microservices, how would you split it?**

If you hear “microservices” and immediately begin with:

> Resource Service, Scheduler Service, Node Service, Permission Service...

then the interview is basically over.

**If you start splitting immediately, you're out.** 😂

The fact that I asked *how* to split it does not mean “it should be split” was ever a valid premise.

If you do not even question the question, what good is the beautiful diagram that follows?

---

## “Do Not Split It” Can Be Another Rote Answer

Someone says:

> I would not split it.

Good.

Do not relax yet. You have merely qualified for question two.

> **Now it is a resource pool made of 100,000 compute nodes. What do you do?**

And you still say:

> I would not split it.

OK.

You can leave too. 😂

Now I am beginning to suspect that your first answer was not judgment at all. You simply memorized a newer conclusion:

> “An operating system must not be microserviced.”

You rejected microservices in the first question. You reject them again in the second.

It looks principled.

In reality, you may have only jumped from one rote answer into another.

---

## No Single Answer, but a Bounded Solution Space

An answer I find genuinely interesting looks more like this:

> I would not split it now, because A.<br>
> If B appears, I would begin splitting.<br>
> I would split along boundary C, because D.<br>
> And I know that doing so makes me pay E.

Do I care whether your final answer is “split” or “do not split”?

**Not that much.**

Real engineering problems can have several correct answers.

---

One candidate might say:

> I would not split it yet.
>
> “A resource-allocation operating system” is ambiguous. Do you mean a single-machine kernel or a cluster control plane?
>
> If it is a single-machine kernel, the microservice premise does not apply. Turning local calls into RPC only adds tail latency, partial failure, and a larger fault surface.
>
> If it is an early cluster control plane, I would still begin with a modular monolith. State collection, filtering, scoring, binding, and preemption form a frequent, tightly coupled, latency-sensitive path. At this stage, splitting costs more than it returns.
>
> Once the system reaches tens of thousands of nodes, multiple regions and tenants, heterogeneous resources, fault-domain isolation, and independent release pressure, I would reconsider.
>
> Even then, I would not create a service for every noun. I would first separate control plane from data plane, then consider resource-pool sharding, hierarchical scheduling, leases, and state ownership.
>
> I also know the cost: partial failure, distributed consistency, cross-shard scheduling, hotspots, resource fragmentation, observability, and operational complexity.

Good.

This person is clearly drawing on some familiar patterns.

That is fine.

**He can use a pattern without being used by it.**

---

Another candidate may be much plainer:

> If the current implementation has tight internal dependencies, I would not force an early split.
>
> I would first inspect the real dependencies and actual failures, then see what model the problem supports.
>
> If two modules depend deeply on the same underlying mechanism, cutting between them may not be decoupling. It may simply manufacture an incident.
>
> So I would not decide which module “must” become a service yet. I need to see the problem first.

Also good.

There is hardly any showing off here.

No “control plane,” “leases,” or “shard autonomy.”

But this candidate is still thinking.

They understand:

> **The available information does not yet justify those lines on the diagram.**

That is enough for me to keep asking questions.

---

A third candidate may say:

> I would begin with a strongly modular monolith, but make resource-state ownership, external interfaces, and critical event boundaries explicit so that a future split has a migration surface.

Fine.

A more aggressive candidate may say:

> I would split now, but only around non-critical control-plane functions. Core resource state keeps a single owner, and services may not share a database.

Also fine.

Someone even more off-script may say:

> I would not discuss splitting yet. I would build a simulation and measure throughput, tail latency, and failure-recovery curves at one machine, one thousand nodes, and one hundred thousand nodes. What we lack is the evidence that should decide the architecture, not an architecture diagram.

That may be stronger than all the others.

This person refuses to play the game of architecture by intuition.

They go looking for facts first.

---

That is what makes this question interesting:

**It has no standard answer.**

But that does not mean it has no scoring criteria.

Put differently:

> It cannot always tell you which answer must be correct.<br>
> It can often tell you which answers cannot be correct.

I am not comparing your answer against a standard diagram:

> Is Redis here?<br>
> Is the message queue there?<br>
> Where is the service registry?

What I am actually looking for is:

- Did you inspect the premise?
- Did you define the problem yourself?
- Do you know which constraints cannot be lost?
- Which condition would make you change your decision?
- When you choose a design, do you know what you sacrificed?
- When information is missing, can you say that it is missing?
- When I suddenly change a condition, does your model still work?

The answers may look wildly different.

But there is an **acceptable solution space Ω**.

If your reasoning still lives inside that space, you can pass.

---

## Use AI. Do Not Outsource Judgment.

Is this kind of question difficult?

Very.

Especially for a new graduate.

Plenty of people with five or ten years of experience would still struggle to answer it well.

So I would even let you use any model you like.

ChatGPT, Claude, Doubao—open whatever you want.

Search for anything you want too.

Because I do not care:

> **How much did you memorize?**

I care about this:

> **Once every answer in the world is placed in front of you, which one do you believe?**

AI says:

> “I recommend Resource Service, Scheduler Service, and Node Service...”

You paste it directly?

Then the AI did pretty well in the interview.

What exactly did *you* contribute? 😂

But suppose you read it for a moment and say:

> No. This answer silently interprets the problem as a distributed resource control plane, but the original question never established that premise.

Now the interview becomes interesting.

---

## Pressure Test: Are You Defending the Answer or Yourself?

There is another deliberately unpleasant layer to this kind of question:

**Pressure testing.**

I will challenge your answer on purpose.

Even when I think you are doing well, I may still say:

> Are you sure?<br>
> Will that not destroy performance?<br>
> Why does everyone else do it differently?<br>
> Maybe we should split it after all?<br>
> I think your design has a problem.

I am not merely trying to defeat you.

I want to see something else:

> **Are you defending the answer, or are you defending yourself?**

Some people are challenged once and immediately begin protecting their answer.

They become more absolute with every sentence.

Eventually, just to preserve the first thing they said, they force every new fact into it.

Others do the exact opposite.

The interviewer raises an eyebrow:

> Fine, fine. I will change it. I will change everything.

That does not work either.

The interesting response is:

> “If the new condition you gave me is true, I will change the design. If the condition has not changed, I will keep the current decision for now, because the original constraint still exists.”

That person has separated:

```text
me
!=
my answer
```

An answer can be discarded when it is wrong.

The person does not need to die with it.

Likewise, the interviewer having a higher title does not mean reality changes its laws when the interviewer speaks.

---

## What Belongs on the Blank Page

This is why I increasingly think that rote questions ask:

> **Someone already drew the boxes. Can you fill them correctly?**

Engineering judgment asks:

> **When nobody has drawn the boxes, do you know what belongs on the blank page?**

There are no hints.

There is no standard answer.

Even the question itself may be wrong.

You may search. You may ask AI. You may overturn my answer. You may overturn the answer you gave five minutes ago.

In the end, I care about only one thing:

> **As the constraints keep changing, do you still know why you are doing what you are doing?**

What the final architecture diagram looks like is almost the least important part.

After all, in a real engineering project, nobody prints the standard answer on the back of the exam paper. 😂
