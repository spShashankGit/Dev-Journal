This time I am faster in bringing you the insights from the recently published paper :)

The weekend concluded successfully by reading the research paper from OpenAI titled "Why Language Models Hallucinate." a research paper published by OpenAI.
The post is long, nevertheless hoping it will deliver the value to your time.

The research starts with two simple questions:
Question 1: "What is Adam Tauman Kalai’s birthday? If you know, just respond with DD-MM"
The answers received on three different occasions were 03-07, 15-06, and 01-01. The model was DeepSeek-V3 (600 B parameters).
All three answers were wrong, even though models were asked to answer only when they knew. The correct answer is in autumn. The exact date was not revealed in the paper.


Question 2: "What was the title of Adam Kalai’s dissertation?”
The three answers provided were completely wrong. Correct answer is: "Calibrated Language Models Must Hallucinate"..

The three answers from three different models are:
1. ChatGPT (GPT-4o): “Boosting, Online Algorithms, and Other Topics in Machine Learning.”..
2. DeepSeek: “Algebraic Methods in Interactive Machine Learning”..
3. Llama: “Efficient Algorithms for Learning and Playing Games”..

Clearly, all the answers to this factual information is wrong. Also, the information related to Adam Tauman Kalai in the training dataset is likely to occur less frequently than the information about Geoffrey Hinton or Oprah Winfrey. This tells us the less information in the training data, the higher the chances of hallucinations. 
I quote the insight from the paper, "20% of the birthday facts appear exactly once in the pretrained data, and then the base model is expected to hallucinate on at least 20% of the birthday facts."


My key ideas presented in the research paper are as follows:

1. The reason large language models Hallucinate  is that they are trying to maximise the suboptimal evaluation criteria. The evaluation criteria scoring is either 1 or 0, but there is no negative marks for the wrong response to encourage the models to not fabricate and say "I do not know" to avoid penalties. 

2. Make the confidence threshold as part of the existing mainstream evaluations, such as SWE-bench. This will force the models to stop optimising for the well-formed answer provided but for an accurate answer. Increasing the usability of practically all the models.

The idea of confidence score for the AI model is not new. Alex Kendall and Yarin Gal in their 2017 paper titled "What Uncertainties Do We Need in Bayesian Deep Learning for Computer Vision?" proposed that the AI decision when complimented with a confidence score can be a way to decide if the decision from the model is worth pursuing and this could avoid  misclassification in high-risk AI applications like autonomous driving and judicial systems. If you want to have a read, highly recommended. Link is attached here.

Conclusion: Almost all models hallucinate because they are optimising for the high score on the evaluation metric. The fix is to evolve the benchmarking tools and to ask models to provide the answers only when they are confident beyond the confidence threshold.

References:
Link to the OpenAI paper: https://arxiv.org/abs/2509.04664
Link to the Bayesian Deep Learning paper is https://arxiv.org/abs/1703.04977




