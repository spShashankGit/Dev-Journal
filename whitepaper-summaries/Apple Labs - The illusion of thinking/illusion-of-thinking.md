# Illusion of thinking

LRM = Large Reasoning Models
LRM = They generate detailsed thinking process before providing answers.

Limitation of LRM
1. While these models demonstrate improved performance on reasoning benchmarks, their fundamental capabilities, scaling properties, and limitations remain insufficiently understood. 

2. Current evaluations primarily focus on established mathematical and coding benchmarks, emphasizing final answer accuracy.

3. Conclusion from paper: Through extensive experimentation across diverse puzzles, we show that frontier LRMs face a complete accuracy collapse beyond certain complexities. 

4. Conclusion 2: They exhibit a counter-intuitive scaling limit: their reasoning effort increases with problem complexity up to a point, then declines despite having an adequate token budget.

## LRM vs their standard LLM, Three performance regime
1. Low-complexity tasks where standard models surprisingly outperform LRMs.
2. Medium-complexity tasks where additionaly thinking in LRMs demostrates advantages, and
3. High-complexity tasks where both models experience complete collapse.

5. In the paper it was reported that LRMs fail to use explicit algorithms and reason inconsistently across puzzles.

6. In this paper reasoning traces were studies in more depth to understand the pattern of explored solutoins and analysing the models' computatational behaviour. 
This helped to throw light on their strengths, limitations, and ultimately raising crucial questions about their true reasoning capabilities.

7. "Thinnking mechanism" in LLMs like OpenAI's o1/o3, DeepSeek-R1, Claude 3.7 Sonnet Thinking, and Gemini Thinking is long Chain-of-Thought(CoT) with self-reflection. 

-----------------------------------------------------------------------------
Open question:
1. Are these models capable of generalizavle reasoning, or are they leveraging different forms of pattern matching? 
______________________________________________________________________________
## Source of whitepaper: 
1. https://ml-site.cdn-apple.com/papers/the-illusion-of-thinking.pdf, accessed on 07.09.2025