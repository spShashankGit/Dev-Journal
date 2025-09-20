# Why languag Models Hallucinate

### Paper premise:
> We argue that language models hallucinate because the training and evaluation procedures reward guessing over acknowledging uncertainty, and we analyze the statistical causes of hallucinations in the modern training pipeline.
> We then argue that hallucinations persist due to the way most evaluations are graded—language models are optimized to be good test-takers, and guessing when uncertain improves test performance.

#### One possible reason for Hallucination
> Hallucinations need not be mysterious—they originate simply as errors in binary classification.




#### Draft for the post
Recently read the paper from OpenAI research titled: Why Language Models Hallucinate
This paper checks the status quo and mention that reason for Hallucination is the sub-optimal evaluation criteria which have same panelty for the wrong answer as for the no-answer.
Hence like a college student language models try to give an answer in a hope that it sticks as there are no-negative consequences in the evaluation metric for a false answer.
I am actually liking this insight, mainly because it is analysisng the reason behind this seemingly hard problem. Additionally, the topic of checking the reproducability in the AI is dear to me. My master thesis findings on the topic has definitley left a mark on me.

My initial idea was to only share my notes from the open paper but the more I read the more I realised it is so similar to my research so I will both of them, of course indicating clearly if the insight is from OpenAI research or from my research.


Lets talk solution:
1. The idea researchers at OpenAI suggested is that we need a Socio-Technical migration i.. modifing the scoring of the existing benchmarks.
I suggested Socio-Technical change too, which is to mention the variance in the accuracy of the model updfront, and append the metadata as of the model like: how many runs were made to achieve the leadboard results, what was the hardware & software used with the exact version of the software packages and also the GPU Drivers used. 
In my reasearch GPU driver version made the difference in the accuracy of the Deep Neural Network accuracy.
