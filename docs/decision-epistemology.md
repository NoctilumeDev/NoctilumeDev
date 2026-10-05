# Decision Epistemology

> **Chinese source edition:** [the original essay at `NoctilumeDev-ZH@eb963cf`](https://github.com/NoctilumeDev/NoctilumeDev-ZH/blob/eb963cf4beb84148cfa5717e3251b5c1a822d252/docs/decision-epistemology.md)
>
> This English edition preserves the original essay's continuous, unsectioned movement. The seven perspectives remain shifting projections rather than a fixed sequence or universal method.

When a person enters a genuinely unfamiliar problem, it feels a little like entering a world in darkness.

There is no map. No signpost. You might even say there is nothing at all.

You do not know where the trees are, where the road is, or whether an “exit” exists at all.

There is very little you can do.

Reach out a hand. Take one step.

If you hit something, stop. Change direction and keep feeling your way forward.

You hear a sound in the distance, but you do not know whether it comes from an exit or somewhere else.

The ground seems to slope, but you do not know whether you are moving outward or descending farther into the unknown.

Reality is probably something like this.

Especially in engineering.

When a system fails, it rarely volunteers the complete causal chain.

What people receive first is usually a few lines of logs, several metrics, one failure that happened to be captured, and a monitoring chart that looks almost normal.

Someone says it is the network.

Someone else says it is the database.

Another person says the code is fine and the environment is the problem.

Someone says this is simply what high concurrency looks like.

Every explanation makes sense. Everyone seems to have seen a small piece.

But how far is that piece from reality?

Nobody knows.

I once summarized my way of thinking with three things: first principles, systems thinking, and metacognition.

After building more real systems, I gradually realized that reductionism, control theory, information theory, and probability had been there too.

So I ended up with a formula:

```text
Engineering judgment
= first principles
x reductionism
x systems thinking
x control theory
x information theory
x probability
x metacognition
```

The formula looked beautiful. Almost perfect.

But whenever I returned to it, something felt wrong.

How do these seven things multiply?

Who assigns a score to first principles?

Systems thinking gets eighty points, information theory gets sixty, and then we multiply them?

Obviously not.

Yet I could never bring myself to delete it.

It was not a real formula, but it was like a photograph.

It captured something that had already begun to form in my mind, even though I could not yet say what it was.

Only later did I realize that the problem might not be the multiplication sign. It might be the phrase “seven factors.”

They are not seven abilities that can be multiplied directly.

They are more like seven projections of the same dark world.

Or seven ways for a person with no direction at all to begin forming a sense of direction.

The protagonist was never first principles or systems thinking. It was certainly not information theory, probability, or control theory.

The protagonist was always the person standing quietly in the darkness, still exploring.

They cannot see clearly. All they can do is change angle and try again.

Even if they still cannot see anything.

First principles make you question which things ahead are solid enough to be real constraints.

Why must this system work this way? Because it always has.

Why must this service own this state? Because it always did.

Why must we split it into microservices?

Why must we add a cache?

Why must the request cross these three layers?

If you keep asking, you often discover that many things described as immovable were merely choices made at one historical moment.

There are far fewer constraints that are genuinely solid.

Money cannot appear from nowhere.

The same exclusive resource cannot legitimately belong to two owners at once.

A person without authorization does not acquire decision authority merely because they are technically capable of acting.

A state without evidence cannot be filled in as success merely because the process is in a hurry to continue.

What first principles provide is something like a sense of constraint.

They help you ask whether the wall in front of you is a real wall, or one you drew there in the past.

But a sense of constraint is not enough.

When the system actually fails, you still need to know where it failed.

“High concurrency caused the incident” sounds like an explanation.

Often it is only a name given to the unknown.

Which request? Which state? Who read first? Who wrote later? Which retry? In which narrow time window did two individually correct actions collide and become an error?

The problem is taken apart piece by piece.

A shapeless mass of darkness becomes several things you can touch.

That is probably the local sense of structure that reductionism provides.

But if you break the problem into pieces for too long, you soon hit another wall.

Every local part is correct, and the system is still wrong.

Every service passes its tests. Every transaction is valid. Every retry has a defensible reason.

Put them together in the ordinary way, and the system can still be pushed toward failure by a crowd of “correct behaviors.”

One service times out and retries.

The downstream service retries too, because it is designed for reliability.

The next service does the same.

The network stumbles for a moment, and every component responsibly works as hard as it can to reconnect.

A problem that might have recovered in seconds becomes an avalanche, amplified by the mechanisms meant to make the system reliable.

The problem is no longer inside the parts.

It is in the relations.

Feedback, delay, coupling, thresholds, competition, state propagation.

A wall, a road, a tree, and a turn mean little in isolation.

Only when they connect does the maze begin to acquire an outline.

Systems thinking provides something like that sense of relation.

Once the outline appears, however, another problem becomes visible: perhaps you never saw the wall clearly in the first place.

The log is real.

But it records only what it records.

The metric is real too.

But it counts only what entered its definition.

HTTP 200 is real.

But it says only that one request returned successfully. It does not mean the entire business responsibility was fulfilled.

Green tests are real.

But “the tested surface passed” and “reality has no problem” are not the same claim.

We never encounter reality in full. We encounter only the traces it leaves behind.

Those traces have already been sampled, filtered, compressed, and transmitted.

They may already be distorted.

Some things were never observed.

Some things were observed and then interpreted incorrectly.

The map is not the territory.

The model is not reality.

That sentence used to sound philosophical.

In engineering, it becomes painfully concrete.

“I did not see it” cannot quietly become “it does not exist.”

“I have a result” cannot quietly become “I have the complete fact.”

So you begin asking: Where did this fact come from? Who observed it? What was omitted? How many transformations did it pass through? Can it be read back again?

Information theory gives something like this sense of observational boundary.

It reminds you that the world in front of you always arrives with loss.

Then probability enters the picture.

Even if every piece of information is true, the future does not become certain.

Failing to hit a race once does not prove that the race does not exist.

Three months without downtime cannot guarantee the fourth month.

A 99.999% success rate looks excellent.

What if the operation runs a billion times a day?

Many problems almost never happen under ordinary conditions.

At sufficient scale, “rare” gradually becomes “eventually.”

Worse, sometimes you have no right to write down a clean percentage at all.

A new system is going live for the first time.

A combination of failures has never been seen before.

Declaring the risk to be 0.37% may simply replace “I do not know” with a number.

What probability truly offers may not be predictive power.

It may be caution about certainty.

It did not happen does not mean it cannot happen.

Low probability does not mean low cost.

Not yet visible does not mean safe to delete.

The map that had become clearer is covered in fog again.

But the fog is not a defect.

Reality contains fog.

The real danger is wiping it away and pretending you can see every road.

At this point, a person has probably begun to understand what they are facing.

But the world does not pause while they continue understanding it.

Something must be done.

A version must ship.

An incident must be handled.

An architecture must be chosen.

Data must be migrated.

You cannot stand still and observe forever.

You must take one step.

That step is the first moment when understanding touches reality.

Change one parameter, and the world answers once.

Send a small percentage of traffic, and the world answers again.

After adding a retry, did success improve, or did the downstream system suffer more?

When automatic recovery begins, does it pull the system back or create a new oscillation?

When do you continue?

When do you stop?

When do you roll back?

When should the machine admit that it no longer has the authority to keep rescuing itself and return control to a person?

Control theory is no longer a phrase about feedback loops in a book.

It becomes: move once, listen once. Move again, listen again.

It provides a sense of feedback.

But as you keep moving, the most troublesome object appears.

Yourself.

People are very good at turning a useful knife into a personal shield.

After learning first-principles thinking, it is easy to believe that everyone else is trapped on the surface while only you have seen the essence.

After learning systems thinking, everything can be called a complex system.

Probability is useful too.

The attempt failed? A low-probability event.

The information is incomplete? Reality is inherently incomplete.

An intelligent person is fully capable of producing a beautiful explanation for every mistake they make.

So eventually, some attention must return to the person holding the tools.

Why did I make this judgment?

Was it really because of the evidence?

Or because I designed the solution myself?

Is this genuinely a first principle, or did I give my intuition a sophisticated name?

I say I validated the result three times. Were all three validations built on the same mistaken premise?

Reality has begun to disagree with my model. Why am I still unwilling to change it?

Metacognition provides something like this sense of self-bias.

But it cannot remain inside the mind.

“I have reflected on it” proves very little.

A person can reflect for a long time and emerge more convinced that they were right.

Eventually, metacognition has to leave the mind and face the world.

Let someone else review it.

Run a red team.

Retain the first failure.

Write the failure condition in advance.

Allow “I do not know” to exist.

Fault injection, gradual rollout, rollback, independent readback - these are not useful because other people are naturally more correct. They are useful because the answer may be mine, but the authority to judge it cannot belong to me forever.

The seven perspectives gradually unfold.

A sense of constraint.

A sense of local structure.

A sense of relation.

A sense of observational boundary.

A sense of uncertainty.

A sense of feedback.

And a sense of one's own bias.

Together, they do not produce an answer.

They produce a sense of direction.

I find that increasingly interesting.

What a person needs in the dark may never have been a navigation manual with the route already written.

Navigation assumes that the roads exist, the route is known, and the destination has been chosen.

A genuinely unfamiliar problem is not like that.

There is no “turn left after two hundred meters.” Nobody can even tell you whether the left side is a road.

All you know is that you hit a wall here, there is wind over there, the ground has begun to slope, the right side remains unclear but has revealed no hard constraint yet, and the left side contains a failure you cannot explain.

Direction emerges slowly.

A sense of direction is not an answer.

It only helps you decide which way is more worth trying when the whole map is unavailable.

This is why I increasingly suspect that engineering judgment is not the possession of more standard answers.

It is the ability to move among seven perspectives while continuing to let reality retain the authority to judge.

But once direction appears, one final question remains.

Do you move?

None of the seven perspectives can take that step for you.

First principles cannot. Systems thinking cannot. Probability can tell you that there is risk ahead. Information theory can tell you that the map is incomplete. Control theory can tell you to listen for feedback after you move.

But why move? Which way? How much consequence are you willing to bear?

That remains a human question.

The goal has always existed outside these tools.

Reality has always existed outside them too.

One gives direction its meaning.

The other keeps correcting the direction.

The human stands between them.

Decision is therefore not an eighth way of thinking.

It is closer to a commitment made to reality on the basis of one's current sense of direction.

Not:

> I have found the truth.

But:

> This is all I can see right now. I know there is much that remains invisible. But on the basis of what I have, I am willing to take one step from here, and I am willing to bear the consequences of that step.

The step can be light.

Roll out gradually. Narrow the scope. Preserve rollback. If deletion has not earned authorization, do not delete yet.

If you do not know, let “I do not know” remain true.

The step can also be heavy.

Some things cannot be rolled out gradually. Some windows disappear after they close. Some decisions are irreversible by nature.

So “always prefer reversibility” can become another dogma.

In the end, the question returns to the person.

Inside incomplete understanding, a person forms a temporary direction and decides how far they are willing to go.

There is no standard answer.

But the absence of a standard answer does not mean that every direction is correct.

The wall is real. The cliff is real. Time is real. Resource limits are real. States that have already occurred are real.

Reality does not lose its constraints because we acknowledge multiple perspectives.

The seven projections can correct one another.

Different people may draw different maps.

They may even find different exits.

But whether a path is actually walkable is still a question only reality can answer.

This is also the strangest thing I notice when I look back at my projects.

They do not look as though they were built from a predefined methodology.

They look more like paths produced by repeatedly colliding with walls inside one black box after another.

Sometimes I thought I had reached the bottom.

The next problem told me there was another layer below.

So the map kept changing.

Rules I once trusted were deleted.

Things that began as vague intuitions reappeared across completely different projects.

When I finally looked back, there really was a path.

But if you ask which step solved the maze, I cannot say.

First principles did not solve it alone. Systems thinking did not. Probability did not.

There was only observation after observation, decomposition after decomposition, reconnection after reconnection, action after action, correction after correction from reality.

Gradually, the direction became clearer.

Only then did I begin to understand the original formula again.

```text
Engineering judgment
= first principles
x reductionism
x systems thinking
x control theory
x information theory
x probability
x metacognition
```

The multiplication sign is probably still wrong.

But I do not need to delete it.

It is a photograph of that moment.

In the photograph, a person still believed they had found seven components that could be assembled.

Later, they discovered that these were not components.

They were seven beams of light cast from different directions by a person facing a world that could never be known completely.

Each beam illuminates only part of the world.

Each beam creates shadows too.

But after changing direction again and again, a place that was entirely dark slowly acquired depth and distance, walls and roads.

Eventually, it acquired direction.

Perhaps this is what decision epistemology is really asking.

How does a person who can never possess reality in full use limited observation, limited models, and limited feedback to generate enough direction to act?

How do they take that step while knowing they may still be wrong?

Not to prove themselves right, but to give reality another opportunity to show them where they are wrong.

Good decision-making is not about finding an infallible method.

It is a refusal to grant error unlimited power.

If you take the wrong path, you can find out.

Once you know, you can stop.

After stopping, you can still return.

The wall you hit this time should not be mistaken for an exit next time.

AI makes this even more visible.

Answers used to be expensive.

Now answers are becoming cheap.

Code can be generated. Architectures can be enumerated. Information can be retrieved quickly. Several models can even be assigned different positions and asked to argue with one another.

But a sense of direction still cannot be downloaded.

What is the problem? Which information deserves trust? Which unknown blocks every judgment that follows? When should we continue? When should we stop? Who may promote a candidate conclusion into fact? Who can call a halt when it is wrong?

These questions still return to the person facing reality.

Tools can make the light brighter and brighter.

The person must still decide where to go.

At this point, I do not really want to make the essay more complete.

The more complete it becomes, the easier it is to create another illusion: that we have finally found one method capable of explaining every decision.

No theory may grant itself permanent immunity.

Not first principles. Not systems thinking. Not metacognition. Not decision epistemology itself.

They are projections of the mind's sense of direction, not the world itself.

The path is not on paper. It is on the road. The road is beneath your feet.

Even the finest way of thinking can only model three-dimensional space on a two-dimensional surface.

Distortion is inevitable.

But the value of what we put on paper is that the next time we hit a wall, it does not have to be in exactly the same way.
