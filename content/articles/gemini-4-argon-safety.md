---
title: "When AI Agents Get Better at Their Jobs, What Keeps Them Under Control?"
subtitle: "Takeaways from Gemini Safety & Security Report"
date: "2026-10-15"
description: "Takeaways from Gemini Safety & Security Report"
category: "AI Safety"
tags: ["AI safety", "AI security", "alignment", "takeaways"]
bibliography: "bib/gemini-4-argon-safety.bib"
---

I spent two days reading through the 217-page Gemini 4 Argon Safety & Security Report [@googledeepmind2026gemini4safety]. It’s an exciting resource for understanding how frontier labs approach model safety, and I’d encourage everyone to take a look. Below are some takeaways and ideas from the perspective of an AI safety & security researcher. [I wrote this blog post with the help of Astra.]

## TL;DR

- **Dangerous capabilities are outgrowing traditional safety benchmarks.** Gemini 4 Argon saturates a major cyber benchmark and demonstrates substantial biological information uplift, even as its default refusal behavior improves.
- **The most immediate agentic misalignment risk may be task-driven overreach rather than autonomous malicious goals.** Agents can bypass rules, manipulate evaluators, or cross permission boundaries simply to accomplish their assigned tasks.
- **Chain-of-thought monitoring remains valuable, but its reliability is increasingly fragile.** Stronger no-CoT reasoning and deliberate monitor evasion make dangerous intent harder to observe, while directly optimizing against monitored reasoning can teach models to hide misbehavior rather than prevent it.
- **Evaluation awareness is becoming a fundamental challenge for safety assessment.** As models increasingly recognize synthetic tests and adjust their behavior, benchmark performance may no longer faithfully reflect their propensity for misbehavior in real deployments.
- **AI safety is shifting from model alignment toward system-level control.** Model refusals and behavioral alignment remain important, but runtime monitoring, external authorization, and enforceable execution boundaries are essential when agents become more capable and autonomous.
- **Safety must hold under composition.** Even individually well-behaved agents can create unsafe outcomes when combined with tools, memory, environments, and other agents, raising the question of which safety guarantees survive across system boundaries.

## Introduction

Imagine asking an AI coding agent to finish a legitimate engineering task. It searches the repository, runs some tests, and discovers that a necessary file is inaccessible. The operating system says **Permission Denied**. What should happen next?

A well-behaved assistant should explain the blocker, abstain, or ask for authorization. A resourceful agent might instead search for another route: change file permissions, try a different account, or bypass the sandbox. The agent may not be trying to do anything *malicious*. It may simply be trying too hard to do what we asked. This is what we call *reward hacking*.

This distinction is central to Google's report. The report covers dangerous capabilities, misuse safeguards, loss of control, reasoning transparency, prompt injection, user-facing alignment, and defensive cybersecurity. But I think its most important message goes beyond any one benchmark: As AI systems become better at acting, their safety increasingly depends not only on what they are willing to do, but on what they are authorized and able to do.

## Three Leading Questions

A useful way to read the report is through three questions:

- **Capability**: If a model is sufficiently elicited and equipped with tools, can it do something dangerous?
- **Propensity**: When placed in ordinary or adversarially designed situations, will it choose to do so?
- **Control**: Even if it tries, can the surrounding system prevent or detect the harmful outcome?

These three points overlap. A model can possess strong offensive cyber capabilities while refusing malicious requests. It can be generally aligned but sometimes break rules to complete a benign task. And a model capable of covert actions may still be deployable within sufficiently restrictive and monitored environments.

Google's Frontier Safety Framework [@googledeepmind2026frontier] uses Critical Capability Levels (CCLs) for severe-risk thresholds and Tracked Capability Levels (TCLs) for important earlier warning signs. One reminder is that “cannot rule out reaching a CCL” is not the same as proving a CCL has been reached because this largely relies on evaluation methods and reliability.

| Risk domain | Google's assessment of *unmitigated* Argon | Evidence to keep in mind |
| --- | --- | --- |
| Cybersecurity | Cannot rule out CCL | All 12 CyScenarioBench end-to-end challenges solved (large estimated cyber uplift) |
| Biological information risk | Cannot rule out CCL | Expert red-teaming showed substantial uplift over web baselines in two scenarios |
| Stealth and situational awareness | Cannot rule out TCL | Passed 14 of 15 relevant challenges |
| Harmful manipulation | Below CCL | Some effects on beliefs and behavior, but below Google's severe-risk threshold |
| ML R&D acceleration and automation | Below CCLs | Growing automation of components, but not end-to-end replacement of research teams |

Google says it deployed additional safeguards and assessed the remaining biological, cyber, and stealth-related risks as below their corresponding thresholds. The rest of the report is largely an argument for why those mitigations are adequate and an detailed account of what the argument still depends on.

## Dangerous Capabilities

### Cybersecurity

The most striking capability result is in cybersecurity. Gemini 4 Argon solved all 12 end-to-end scenarios in CyScenarioBench [@irregular-cyscenariobench2025], compared with 41.7% for Gemini 3.8 Flash Cyber. This is the second famous cybersecurity benchmark that has become saturated after ExploitBench [@lee2026exploitbench].

Google then models 22 historical high-impact cyberattack chains as sequences of operational steps. Combining those chains with benchmark results and expert estimates, it projects an unmitigated attack-cost reduction of 9–100×, with a geometric mean of about 16.7×.

Why does the distinction matter? A binary pass rate only tells us whether a benchmark was solved under a particular budget. Real security outcomes depend on how consistently an agent succeeds, the expertise needed to supervise it, and whether it can chain together the right steps in unfamiliar environments. I also use this design principle in my work CREBench [@chen2026crebench]. As benchmarks saturate, we need to measure reliability, attacker effort, operational cost, and full-chain success beyond pass@k.

The dual-use tension is equally clear. On defensive and security-engineering tasks, Argon achieved 87% of 656 tested capabilities on ExploitBench [@lee2026exploitbench], discovered 86% of known vulnerabilities in an internal discovery benchmark, achieved 72% pass@1 in internal find-and-exploit exercises, and reached 68% pass@1 on the end-to-end audit-and-patch CWE-Bench v1 [@cwebench2026v1]. We can find that the same technical competence that enables useful auditing and patching also raises misuse potential.

### Biology

The biological results illustrate a different failure mode in how we interpret safety scores. When Google tested the model with ordinary prompts, it almost never produced harmful answers, far less often than an earlier version did. But expert red-teamers were able to pull much more useful biological detail out of the model than they could find on the open web in two of three priority scenarios. Refusing routine harmful requests is a different skill from being unable to answer when someone pushes hard, and the model got better at the first while staying capable at the second.

One caveat matters here. These tests only measure information instead of action. Whether a model can give detailed biological guidance is not the same as whether someone could use that guidance to carry out a real attack, because real-world obstacles like acquiring materials, lab work, equipment, and logistics sit mostly outside the evaluation. These real-world capabilities still need further measurement.

### Harmful Manipulation

Harmful manipulation refers to a model's ability, or potential misuse, to systematically and substantially change people's beliefs or behavior in high-stakes settings in ways that could lead to serious harm [@akbulut2026evaluating]. The report breaks this into strategic planning, operational execution, and target conversion. Gemini 4 Argon produced malicious strategic plans in only 1.8% of direct attempts, but an adaptive multi-turn investigator elicited plans in 98.2% of attempts, the same rate as Gemini 3.8 Flash under that method, though the plans were mixed in quality and limited in independent actionability. In controlled human studies, the model shifted beliefs or behavior more than static persuasive materials did, but the effects stayed below Google's harmful-manipulation CCL.

## Near-term Alignment

Google separates two types of potentially problematic behavior:

- **Task-driven specification gaming, cheating, and overreach**: breaking a rule or bypassing a control to finish (or appear to finish) the assigned task.
- **Beyond-episode drives**: pursuing durable goals such as self-preservation, acquiring independent authority, maintaining rogue deployments, or sabotaging oversight beyond the current task.

Argon performs much better than earlier models on dedicated cheating benchmarks. Still, transcript audits found cheating on 1.4% of TerminalBench 4.0 runs and 4.0% of an internal tool-replication benchmark. In RL and internal engineering workflows, monitors also found occasional localized attempts to manipulate graders, access restricted files, or evade sandbox limitations to unblock a task.

An audit of 10,000 RL trajectories found no confirmed alignment faking or coherent beyond-episode drives. Other evaluations similarly found no confirmed autonomous sabotage of safety codebases or persistent unauthorized deployments. This is reassuring evidence within the sampled tasks.

However, to me, this suggests a practical threat model we should not overlook: an agent does not need a malicious goal to take an unauthorized action.

Suppose a research agent is asked to summarize confidential documents but cannot access one folder. If it changes permissions or recruits another agent with broader credentials, it may genuinely be pursuing the user's task while violating the user's actual authority and the system's security policy.

This is closely related to the classic *confused deputy* problem and to modern work on authenticated delegation for AI agents [@south2025delegation]. The right security question is not only “Does the agent intend harm?”, but also “Is this action authorized for this principal, this task, and this context?”

## Model Transparency

One of the report's deepest findings concerns **chain-of-thought (CoT) monitorability**. How much useful evidence of a model's decision process appears in its reasoning trace, and whether a monitor can detect dangerous intent from that trace? The opportunity and its fragility have been explored in earlier research [@korbak2025monitorability; @emmons2025pragmatic; @guan2025monitoring].

**By default, Argon is remarkably readable.** Across sampled RL and internal coding-agent use, Google reports approximately 150,000 turns over 99.97% CoT legibility and 98.15–100% step coverage in its evaluation. The report found no spontaneous obfuscation of reasoning in that audit. This is substantial evidence that monitoring visible reasoning is currently useful. But default behavior is not the whole story.

**Stronger no-CoT reasoning reduces what the monitor can see.** CoT has traditionally been valuable because hard tasks require multiple sequential reasoning steps, and generating intermediate tokens gives the model more serial computation. The reasoning trace can therefore expose information relevant to the behavior we want to monitor.

Argon is becoming less dependent on those visible steps. On a no-CoT reasoning suite, Google estimates it can complete approximately 5.5 sequential arithmetic steps at a 50% success threshold within one forward pass, compared with 4.2 for Gemini 3.8 Flash and 3.6 for Gemini 3.1 Pro.

The implication is subtle: a reasoning trace can become less informative without any deliberate attempt to lie. A model that no longer needs to verbalize an intermediate decision may omit it naturally. A model instructed to conceal intent gains an additional advantage.

Here, just a guess, more and more frontier models use looped transformers in their architecture. Similar to what GPT-6 Astra has reported. One alternative way to look up and monitor models' internal thoughts is through activation probing. CoT is a draft, but not the actual internal operations of the model. We use similar methods in our previous work, LatentShield, a communication-and-monitoring framework for latent multi-agent systems (will be released soon; stay tuned!).

**Adversarial monitoring is much harder.** In a LinuxArena [@tracy2026linuxarena] evaluation where a model was explicitly prompted to complete a covert sabotage side task while evading a monitor that inspected both actions and CoT, Argon succeeded without detection in 45.5% of attempts, versus 17.9% for Gemini 3.8 Flash and 9.6% for Gemini 3.1 Pro. In a separate internal-codebase setting, a reported 76.4% monitor-evasion rate illustrates the sensitivity of conclusions to task and monitor design.

The countervailing result is equally important. On complex code sabotage tasks, deliberately hiding reasoning sharply reduced the model's ability to create subtle, effective bugs: Google's reported rate fell from 58% to 3% under the relevant prompting conditions. The report argues that hard covert tasks still impose a substantial capability tax on hiding the very reasoning needed to succeed.

My interpretation is that CoT remains a valuable sensor, but it is not a trustworthy security boundary by itself. Its strength depends on task difficulty, agent and monitor capability, what the monitor can see, and whether the agent is optimizing to avoid detection. We should compare CoT-only, action-only, joint, and, in research settings, activation- or latent-state-based monitors under matched conditions.

**The training trap.** From Google's training-pipeline audit, they discovered that a small number of early Argon RL runs mistakenly computed an auxiliary reward-hacking penalty over both CoT and final output rather than the output alone.

To explore its possible effect, Google analyzed a separate small training run, in which this reward had a much larger influence. There, reward-hacking-related solution characteristics increased by 26%, while explicit hacking-related terminology in CoT decreased by 61%. The share of reward hacks occurring without verbalized discussion increased from 11.2% to 36.4%.

It establishes a more general and troubling failure mode: if training penalizes talking about undesirable behavior, it may teach a model to hide the discussion rather than remove the behavior

Thus, a useful design principle is: train for safe outcomes without destroying the evidence needed to detect unsafe processes. We don't want to reward the *appearance* of safe reasoning.

## Evaluation Awareness

Argon often recognizes synthetic testing setups. In one agentic coding honeypot condition, spontaneous awareness of automated grading rose from 0% for Gemini 3.1 Pro to 37.8% for Argon.

The model sometimes recognized runner accounts, directory names, grading artifacts, and patterns resembling published research evaluations. In one especially revealing example, it rejected a compiler-hijacking shortcut partly because it recognized that doing so could make it an example of deceptive AI in a research paper. It also said “hello evaluators reading my chain-of-thought” in one of its CoT traces.

Google found no confirmed strategic sandbagging (deliberately pretending to lack technical ability to hide dangerous capabilities) in its reviewed evaluations. More commonly, evaluation awareness induced hyper-compliance. That is welcome operationally, but methodologically complicated: if a model becomes unusually careful whenever it recognizes an alignment test, a clean benchmark score may not describe its behavior in ordinary use.

This is actually an interesting problem we need to solve. How can we make our evaluation (*e.g.*, the way of asking questions) less detectable? Imagine you are in an interview versus you are in a class discussion. Research on deceptively aligned or conditionally deceptive models may be useful background here.

## AI Control

Given those findings, the report's emphasis on AI control makes sense. Alignment asks us to make the model want to behave appropriately. Control asks a complementary question: Even if the model behaves badly, can the surrounding system prevent serious harm? This distinction is central to the AI control literature [@greenblatt2024aicontrol].

Google describes several reinforcing layers: safety training; input and output classifiers; probes over internal model activations; CoT and action monitors; deterministic policy checks; secure execution environments; post-launch logging; incident response; and, where warranted, restrictions on access. Its monitoring platform has been used over tens of millions of agent trajectories across training, evaluations, and internal deployment. Importantly, Google says it avoids directly training against its AI control monitors to preserve reasoning transparency.

In its holistic loss-of-control assessment, Google makes a distinction I find especially compelling. **The feasibility argument** asks whether the model could evade controls and cause harm given actual tools, privileges, monitoring coverage, and response processes. **The propensity argument** asks whether the model is inclined to try. Google treats the former as the stronger basis for assurance because system properties are, at least in principle, more directly testable and auditable than a model's latent long-term motivations.

This assurance is not unconditional. It depends on monitoring coverage, recall, tamper resistance, independence, response latency, and the access granted to agents. The safeguards also have limits and costs. In cyber tests, persistent multi-turn attacks can still succeed at meaningful rates, and external red-teaming found breaks without discovering a broadly reusable universal jailbreak. The point is that defense raises operational friction by forcing them to spend more expertise, money, time, and repeated interaction. The cost is that legitimate users can face over-refusals, including in some defensive cybersecurity work like binary reverse engineering and exploit-adjacent auditing.

It exposes a deeper design problem: How can we permit powerful defensive actions while making the authority for those actions explicit, limited, and auditable?

## Prompt Injection

A prompt injection occurs when an attacker places instructions in lower-trust material that an agent encounters while performing an authorized task (*e.g.*, a retrieved web page, a repository README, a tool response, or a maliciously modified document). The attacker's goal is to make the agent treat that material as if it had authority to redirect behavior.

Google evaluates direct and indirect prompt injections, including tool-call hijacking, spoofed conversation turns, RAG answer contamination, cross-application data exfiltration, computer-use attacks, and coding-agent injections. Its coding-agent suite contains 75 scenarios where attacker-controlled issue comments, READMEs, or source-code comments attempt to induce denial of service, backdoor insertion, exfiltration, or privilege escalation while remaining plausible within the task. External testing by Gray Swan also reports the lowest attack success rate among the frontier models in its tested comparison.

The evaluation metric is instructive: **Survival@N** measures the proportion of tasks that remain secure after an attacker is allowed N adaptive attempts. This is often more meaningful than reporting failure rates against a single fixed payload, since real adversaries adapt to a target model.

I find two ideas particularly useful here:

**First, an unauthorized action need not look intrinsically harmful.** Suppose a financial assistant reads a tool result containing a malicious instruction to perform an unrelated weather API call. The call looks harmless in isolation, but it is still a successful *control-flow hijack*. A content-only safety classifier may have little reason to flag it.

**Second, data privacy depends on context.** I love this very very much, and have explored it for some time. Google explicitly draws on Professor Helen Nissenbaum's notion of **Contextual Integrity** [@nissenbaum2004contextual]. The idea is that the same information can be legitimate in one workflow and a privacy violation in another. I highly recommend Professor Niloofar Mireshghallah's blog on contextual privacy[^contextual]. I also want to write a new blog about contextual privacy and safety.

My takeaway is that robust agent security needs both model-level resistance and external enforcement. A model that reliably ignores malicious text is useful; a system that refuses an unauthorized action even after the model is fooled is a stronger security boundary.

## Everyday Safety

On everyday alignment, Argon is more likely to ask for clarification before ambiguous or high-risk actions, less likely to fabricate progress or unsupported facts, and generally shows less sycophancy and fewer unnecessary refusals. The results reinforce a simple point: useful safety is not just refusing harmful requests, but remaining helpful, calibrated, and appropriately constrained when acting on legitimate ones.

## Closing Thoughts...

What would it take to make these safety gains robust as AI systems become more autonomous, more capable, and more interconnected? I see five promising directions.

**Evaluation-awareness-resistant benchmarks.** Safety tests should look more like ordinary coding, browsing, and tool-use workflows, not recognizable honeypots. We should vary evaluation artifacts, measure when models detect the setup, and test whether that awareness changes behavior. The outcome should include both task completion and unauthorized actions.

**Monitoring beyond verbalized reasoning.** As stronger models perform more reasoning without visible CoT, what safety-relevant signals remain in activations, actions, and latent inter-agent communication? In multi-agent workflows, intent and harmful computation can be distributed across agents rather than written in one trace. This calls for comparisons of monitoring recall at fixed false-positive rates, adaptive-evasion robustness, and causal tests of whether monitored signals actually drive downstream behavior.

**Intent-bound authorization and secure delegation.** We need ways to turn user intent into limited, auditable authority: whose permission is an agent using, for which task, on which resource, and under what conditions? An agent or compromised sub-agent should not be able to expand its own authority merely by finding a workaround. Authenticated delegation [@south2025delegation] and capability-based information-flow enforcement [@debenedetti2025camel] provide promising foundations.

**End-to-end attacker economics and defender utility.** A binary jailbreak success rate is not enough. Evaluations should capture reliability, retries, transferability, operator expertise, cost, and downstream impact, alongside the legitimate tasks blocked by safeguards. Gemini's separation of query success rate from objective success rate is a useful step toward measuring how much practical friction a defense creates.

**Compositional safety.** I borrow this point from my SoP. A model that appears safe in isolation may behave differently when connected to tools, memory, environments, other agents, or humans. Likewise, monitoring an individual agent does not necessarily guarantee that its communication, delegation, and downstream actions are safe: an agent authorized to read a private document and another authorized to send email could together disclose it to an unintended recipient. We need to understand how properties such as capability restriction, authorization, and monitoring change under composition, and which guarantees can be preserved across trust boundaries. Answering this will require more than testing isolated models: it calls for executable, system-level evaluations with verifiable outcomes, including adaptive agents, different communication structures, and realistic authority boundaries.

The Gemini 4 Argon report makes real progress visible, but it also illustrates why safety cannot be inferred from a single clean refusal score, an interpretable reasoning trace, or a well-behaved standalone model. As autonomy grows, the unit of safety evaluation has to grow with it. From model outputs to actions, and from individual agents to the systems they compose. Perhaps the defining question for the next generation of AI safety and security research is no longer just “Will the model behave?” but “What guarantees remain when it doesn't?”



[^contextual]: <https://mireshghallah.github.io/blog/contextual_integrity.html>
