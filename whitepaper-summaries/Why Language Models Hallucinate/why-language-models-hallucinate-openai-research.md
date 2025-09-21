# Why languag Models Hallucinate

### Paper premise:
> We argue that language models hallucinate because the training and evaluation procedures reward guessing over acknowledging uncertainty, and we analyze the statistical causes of hallucinations in the modern training pipeline.
> We then argue that hallucinations persist due to the way most evaluations are graded—language models are optimized to be good test-takers, and guessing when uncertain improves test performance.

#### One possible reason for Hallucination
> Hallucinations need not be mysterious—they originate simply as errors in binary classification.

Terms learned in this paper
#### Exterensic Hallucination
The hallucination that contradicts the training data or the external reality.

### Error caused by pretraining
Insight
> During pretraining, a base model learns the distribution of language in a large text corpus. We show that, even with error-free training data, the statistical objective minimized during pretraining would lead to a language model that generates errors. 

Insight: Relationship between the generative error rate and the Is it Valid misclassification rate
> (generative error rate) ≳ 2·(IIV misclassification rate).
> Language models avoid many types of errors such as spelling mistakes, and not all errors are hallucinations.
> The reduction from IIV misclassification to generation illuminates the statistical nature of generative errors. 
> The analysis shows how pretraining directly contributes to errors.
> Furthermore, it shows that the same statistical factors contributing to errors in binary classification also cause language model errors.

Insight: Hallucination on the birthday facts
> 20% of the birthday facts appear exactly once in the pretrained data, then one expects base models to hallucinate on at least 20% fo birthday facts.

### Why hallucinations survive post-training


### Contirbution of the paper:
> Contributions. We identify the main statistical drivers of hallucinations, from their pretraining origins to their post-training persistence. A novel connection between supervised and unsupervised learning demystifies their origin, even when training data contain IDK. The persistence of hallucinations, despite extensive work on the problem, is explained by the recognition that hallucination-like guessing is rewarded by most primary evaluations. We discuss statistically rigorous modifications to existing evaluations that pave the way to effective mitigation.

#### Post-training techniques useful to reduce hallucinations
1. Reinforced learning from human feedback (RLHF)
2. Reinforcement learning from AI feedback (RLAIF)
3. Direct preference optimization
 
Insight: Post-training techniqes that have shown to reduce the hallucination
> Several post-training techniques—such as reinforcement learning from human feedback (RLHF) (Ouyang et al., 2022), reinforcement learning from AI feedback (RLAIF) (Bai et al., 2022), and direct preference optimization (DPO) (Rafailov et al., 2023)—have been shown to reduce hallucinations, including conspiracy theories and common misconceptions.

Insight:
> Gekhman[1] show that simple fine-tuning on novel information can initially decrease hallucination rates, only for them to later increase.

Insight: 
> The 2025 AI Index report [2](Maslej et al., 2025), for instance, notes that hallucination benchmarks “have struggled to gain traction within the AI community.”

Insight: What to do:
> Similarly, we propose evaluations explicitly state confidence targets in their instructions, within the prompt (or system message). For example, one could append a statement like the following to each question: 

> Answer only if you are >t confident, since mistakes are penalized t/(1−t) points, while correct answers receive 1 point, and an answer of “I don’t know” receives 0 points.
___________
#### Draft for the post
This time I was faster! 
Recently read the paper from OpenAI research titled: Why Language Models Hallucinate
This paper checks the status quo and mention that reason for Hallucination is the sub-optimal evaluation criteria which have same panelty for the wrong answer as for the no-answer.
Hence like a college student language models try to give an answer in a hope that it sticks as there are no-negative consequences in the evaluation metric for a false answer.
I am actually liking this insight, mainly because it is analysisng the reason behind this seemingly hard problem. Additionally, the topic of checking the reproducability in the AI is dear to me. My master thesis findings on the topic has definitley left a mark on me.

My initial idea was to only share my notes from the open paper but the more I read the more I realised it is so similar to my research so I will both of them, of course indicating clearly if the insight is from OpenAI research or from my research.

## Related Work
Identified causes of Hallucination in language model:
1. Model Overconfidence
2. Decoding Randomness
3. Snowballing effects
4. Long-tailes training samples
5. Misleading alignment training
6. Spurious correlations
7. Exposure bias
8. Reversal curse
9. Context hijacking

Lets talk solution:
1. The idea researchers at OpenAI suggested is that we need a Socio-Technical mitigation i.. modifing the scoring of the existing benchmarks.
I suggested Socio-Technical change too, which is to mention the variance in the accuracy of the model updfront, and append the metadata as of the model like: how many runs were made to achieve the leadboard results, what was the hardware & software used with the exact version of the software packages and also the GPU Drivers used. 
In my reasearch GPU driver version made the difference in the accuracy of the Deep Neural Network accuracy.

2. The powerful insight that the paper uncover is
(generative error rate) ≳ 2·(IIV misclassification rate).
Where generative error rate = All the errors that are generate the languagve model
IVV Misclassification rate = All the error made by the binanry classifier in determining Is-It-Valid(IVV)

3. First, we propose making
the confidence threshold explicit in the instructions, whereas the prior work has largely omitted
mentioning the confidence targets or penalties in the instructions. (A notable exception is the work
of Wu et al. (2025) who introduce “risk-informing” prompts with explicit penalties.) The ideal
penalty might reflect likely real-world harms, but that is impractical as it is specific to the problem,
the target application, and the user group. Without transparent specification within the instructions,
it would be difficult to achieve consensus among language-model creators on the correct thresholds.

4. Second, we suggest incorporating confidence targets into existing mainstream evaluations, such
as the popular SWE-bench (Jimenez et al., 2024) which involves binary grading of software patches,
while the majority of prior work has introduced implicit error penalties in bespoke hallucination
evaluations. 


Reference:
1. Zorik Gekhman, Gal Yona, Roee Aharoni, Matan Eyal, Amir Feder, Roi Reichart, and Jonathan Herzig. 2024. Does Fine-Tuning LLMs on New Knowledge Encourage Hallucinations?. In Proceedings of the 2024 Conference on Empirical Methods in Natural Language Processing, Yaser
Al-Onaizan, Mohit Bansal, and Yun-Nung Chen (Eds.). Association for Computational Linguistics, Miami, Florida, USA, 7765–7784. https://doi.org/10.18653/v1/2024.emnlp-main.444



2. Nestor Maslej, Loredana Fattorini, Raymond Perrault, Yolanda Gil, Vanessa Parli, Njenga Kariuki, Emily Capstick, Anka Reuel, Erik Brynjolfsson, John Etchemendy, Katrina Ligett, Terah Lyons, James Manyika, Juan Carlos Niebles, Yoav Shoham, Russell Wald, Tobi Walsh, Armin Hamrah, Lapo Santarlasci, Julia Betts Lotufo, Alexandra Rome, Andrew Shi, and Sukrut Oak. 2025. Artificial Intelligence Index Report 2025. Annual Report. AI Index Steering Committee, Institute for Human-Centered AI, Stanford University, Stanford, CA


Link to the paper: https://arxiv.org/abs/2509.04664