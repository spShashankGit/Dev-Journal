# Illusion of thinking

LRM = Large Reasoning Models
LRM = They generate detailsed thinking process before providing answers.

Limitation of LRM
1. While these models demonstrate improved performance on reasoning benchmarks, their fundamental capabilities, scaling properties, and limitations remain insufficiently understood. 

2. Current evaluations primarily focus on established mathematical and coding benchmarks, emphasizing final answer accuracy.

3. Conclusion from paper: Through extensive experimentation across diverse puzzles, we show that frontier LRMs face a complete accuracy collapse beyond certain complexities. 

4. Conclusion 2: They exhibit a counter-intuitive scaling limit: their reasoning effort increases with problem complexity up to a point, then declines despite having an adequate token budget.

> ### LRM vs their standard LLM, Three performance regime
> 1. Low-complexity tasks where standard models surprisingly LLMs outperform LRMs.
> 2. Medium-complexity tasks where additionaly thinking in LRMs demostrates advantages, and
> 3. High-complexity tasks where both models experience complete collapse.

5. In the paper it was reported that LRMs fail to use explicit algorithms and reason inconsistently across puzzles.

6. In this paper reasoning traces were studies in more depth to understand the pattern of explored solutoins and analysing the models' computatational behaviour. 
This helped to throw light on their strengths, limitations, and ultimately raising crucial questions about their true reasoning capabilities.

7. "Thinnking mechanism" in LLMs like OpenAI's o1/o3, DeepSeek-R1, Claude 3.7 Sonnet Thinking, and Gemini Thinking is long Chain-of-Thought(CoT) with self-reflection. 

8. Test setup: Instead of standard benchmark (e.g. math problems), we adopt controllable puzzle environments that let us vary complexity systematically - by adjusting puzzle elements while preserving the core logic - and inspect both solutions and internal reasoning. 
    1. These puzzle offer fine-grained control over complexity
    2. Avoid contamination, common in established benchmarks
    3. Require only the explicitly provided rules, emphasizing algorithms reasoning
    4. Support rigrous, simulator-based evaluation, enabling precise solution check and detailed failure analyses.


## Investigation results
1. Despite sophisticated self-reflection mechanism learned through reinforcement learning, these models fail to develop generalizable problem-solving capabilities for planning tasks, with performance collapsing to zero beyond a certain complexity threshold.

2. Comparison between LRMs and standard LLMs under equivalent inference compute reveals three distinction reasoning regimes 
see previous section [LLM vs LRM](###lrm-vs-their-standard-llm-three-performance-regime)

3. Analysis of thoughts (or intermediate reasoning traces) reveal complexity-dependent patterns: 
    - In simpler problems, reasoning models often identify correct solutions early but inefficiently continue exploring incorrect alternatives - an "overthinking" phenomenon.
    - At moderate complexity, correct solutions emerge only after extensive exploration of incorrect paths. 
    - Beyond a certain complexity threshold, models complexity fail to find correct solutions. This indicated LRMs possess limited self-correction capabilities that, while valuable, reveal fundamental inefficiencies and clear scaling limitations.

## Key contribution of the study
1. **Question the current evaluation paradigm of LRMs** on established math benchmarks and design a controlled experimental testbed by leveraging algorithmic puzzle environments that enable controllable experimention with respect to problem complexity.
2. **Showcase state of the art LRMs** (e.g., o3-mini, DeepSeek-R1, Claude-3.7-Sonnet-Thinking) **still fail to develop generalized problem-solving capabilities**, with accuracy ultimately collapsing to zero beyond certain complexity across different environments.
3. **There exist a scaling limit in the LRMs' resoning effort with respect to problem complexity**, evidenced by the counterintuitive decreasing trend in the thinking token after a complexity point.
4. Study questioned current evaluation paradigm based on final accuracy and extend the evaluation to internmediate solutions of thinking traces with the help of deterministic puzzle simulators. The analysis reveal that as the problem complexity increases, correct solutions systematically emerge at later positions in thinking compared to incorrect ones, providing quantitative insights into the self-correction mechanism within LRMs.
5. **Uncovered surprising** limitation in LRMs ability to perform exact computation, including their **failure to benefit from explicit algorithms and their inconsistent reasoning across puzzle types**.

## Ability of LLMs
1. LLMs demostrate promising language understanding with strong compression capabilities, their intelligence and reasoning abilities remain a critical topic of scientific debate.
    2. LLMs undergo **multiple** costly trainign phases using vast amounts of trainign data.
2. **Insight:** Earlier iterations of LLMs exhibited poor performance on reasoning benchmarks. To address these shortcomings, several approaches have been explored with the common theme among them being "scaling" both the training data and test-time computation.
3. **Insight:** Generating a CoT[15, 16, 17, 18] and incorporating self-verification[19, 20, 21] prior to the final answer have been shown to improve model performance.
___
## Open question:
1. Are these models capable of generalizavle reasoning, or are they leveraging different forms of pattern matching? 
2. How does their performance scale with increasing problem complexity? 
3. How do they compare to their non-thinking standard LLM counterparts when provided with the same inference token compute? 
4. What are the inherent limitations of current reasoning approaches?
5. What improvements might be necessary to advance towards more robust reasoning capabilities?
----
## Reference: 
[1] Source of whitepaper: https://ml-site.cdn-apple.com/papers/the-illusion-of-thinking.pdf, accessed on 07.09.2025


[15] Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed H. Chi, Quoc V. Le, and Denny Zhou. Chain-of-thought prompting elicits reasoning in large language models. In Sanmi Koyejo, S. Mohamed, A. Agarwal, Danielle Belgrave, K. Cho, and A. Oh, editors, Advances in Neural Information Processing Systems 35: Annual Conference on Neural Information Processing Systems 2022, NeurIPS 2022, New Orleans, LA, USA, November 28 - December 9, 2022, 2022.

[16] Mehran Kazemi, Najoung Kim, Deepti Bhatia, Xin Xu, and Deepak Ramachandran. Lambada: Backward chaining for automated reasoning in natural language. arXiv preprint arXiv:2212.13894, 2022.


[17] Hattie Zhou, Azade Nova, Hugo Larochelle, Aaron Courville, Behnam Neyshabur, and Hanie Sedghi. Teaching algorithmic reasoning via in-context learning. arXiv preprint arXiv:2211.09066,2022.


[18] Takeshi Kojima, Shixiang Shane Gu, Machel Reid, Yutaka Matsuo, and Yusuke Iwasawa. Large language models are zero-shot reasoners. Advances in neural information processing systems, 35:22199–22213, 2022.


[19] Yixuan Weng, Minjun Zhu, Fei Xia, Bin Li, Shizhu He, Shengping Liu, Bin Sun, Kang Liu, and Jun Zhao. Large language models are better reasoners with self-verification. In Houda Bouamor, Juan Pino, and Kalika Bali, editors, Findings of the Association for Computational Linguistics: EMNLP 2023, pages 2550–2575, Singapore, December 2023. Association for Computational Linguistics.


[20] Yifei Li, Zeqi Lin, Shizhuo Zhang, Qiang Fu, Bei Chen, Jian-Guang Lou, and Weizhu Chen. Making language models better reasoners with step-aware verifier. In Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pages 5315–5333, 2023.

[21] Eric Zhao, Pranjal Awasthi, and Sreenivas Gollapudi. Sample, scrutinize and scale: Effective inference-time search by scaling verification. arXiv preprint arXiv:2502.01839, 2025.


[22] Eric Zelikman, Yuhuai Wu, Jesse Mu, and Noah Goodman. STar: Bootstrapping reasoning with reasoning. In Alice H. Oh, Alekh Agarwal, Danielle Belgra