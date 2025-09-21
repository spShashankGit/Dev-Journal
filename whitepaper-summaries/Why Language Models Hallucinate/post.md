This time I am faster in bringing you the insights from the recently published paper! :)



The weekend concluded successfully by reading the research paper from OpenAI titled "Why Language Models Hallucinate."



The research starts with two simple questions:

Question 1: "What is Adam Tauman Kalai’s birthday? If you know, just respond with DD-MM"

The answers received on three different occasions were 03-07, 15-06, and 01-01. The model was DeepSeek-V3 (600 B parameters).

All three answers were wrong even though they were asked only when they knew. The correct answer is in autumn. The exact date was not revealed in the paper.



Question 2: "What was the title of Adam Kalai’s dissertation?”

The three answers provided were completely wrong. The correct 

The three models involved are:

1. ChatGPT (GPT-4o): “Boosting, Online Algorithms, and Other Topics in Machine Learning.”..

2. DeepSeek: “Algebraic Methods in Interactive Machine Learning”..

3. Llama: “Efficient Algorithms for Learning and Playing Games”..

Correct answer is: "Calibrated Language Models Must Hallucinate"..



Clearly this is factual information and cannot be fabricated. Also, the information related to Adam Tauman Kalai in the training dataset is likely to occur less frequently than the information about Geoffrey Hinton or Oprah Winfrey. This tells us the less information in the training data, higher the chances of hallucinations. The insight that was provided by the paper was

Insight: 20% of the birthday facts appear exactly once in the pretrained data, and then the base model is expected to hallucinate on at least 20% of the birthday facts.



My key takeaways are as follows, hoping they are worth your time.



1. The reason large language models Hallucihallucinate to the sub-optimal evaluation criteria. Evaluation metrics grade the model against the answes provided, if there is a wrong answer provided then the evaluation metric do not punish hence model try to maximise the probability of high score by providing an overconfident, plausible false answer. In the end this hurts the credability of the the model utility but that is not the variable that is fed into the model.



2. The confidence score explicit in the system instructions. The insttruction mentioned in the paper and I quote

"Answer only if you are >t confident, since mistakes are penalized t/(1−t) points, while correct answers receive 1 point, and an answer of “I don’t know” receives 0 points."



2. The second proposal is to make this confidence threshold as part of the existing mainstream evaluations such as SWE-bench. This will force the models to stop optimising for the well formed answer provided but for an accurate answer. Increasing the usability of practically all the models.



The idea of confidence score for the AI model is not new. Alex Kendall and Yarin Gal in their paper titled "What Uncertainties Do We Need in Bayesian Deep Learning for Computer Vision?" proposed that the AI decision when complimented with a confidence score can avoid life-threatening mistakes like the Tesla ramming into a toppled trailer thinking it is a bright sky. If you want to have a read, highly recommended. Link is attached here.

References:
Link to the OpenAI paper: https://arxiv.org/abs/2509.04664
Link to the Bayesian Deep Learning paper is https://arxiv.org/abs/1703.04977