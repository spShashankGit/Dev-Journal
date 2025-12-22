
| Dimension (Feature) | Car (Vector) | Bus (Vector) | Apple (Vector)|
|----|----|----|----|
| Is it a vehicle?| 0.98 |0.99 |0.01 |
|Is it for public transport? | 0.12 | 0.95 | 0.02|
|Does it have wheels?|0.95|0.97|0.00|
Is it edible?|0.00|0.00|0.98|



## The Dot Product (Scalar Product)
The dot product measures how much two vectors "align" with each other. The result is always a scalar (a single number, not a vector).

### How to Calculate It
There are two primary ways to calculate the dot product of two vectors, $\vec{a}$ and $\vec{b}$:
* Component Method: Multiply the corresponding components and sum them up.3$$\vec{a} \cdot \vec{b} = a_x b_x + a_y b_y + a_z b_z$$

* Geometric Method: Use the magnitudes and the angle 4$\theta$ between them.5$$\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos \theta$$



### Advantages & Uses
1. **Finding Angles:** It is the easiest way to find the angle between two vectors. If you know the components, you can solve for $\theta$.

2. **Determining Perpendicularity:** If the dot product is 0, the vectors are perfectly perpendicular (90°).

3. ***Projections:** It allows you to find the "shadow" of one vector onto another.

4. **Physics (Work):** It is used to calculate work (8$W = \vec{F} \cdot \vec{d}$), where only the force acting in the direction of movement counts.

### Comparison Table

|Feature|Dot Product|Cross Product|
|--|--|--|
|Result Type|Scalar (Number)|Vector (Direction + Magnitude)|
|Maximized When|Vectors are Parallel (0°)|Vectors are Perpendicular (90°)|
|Zero When|Vectors are Perpendicular|Vectors are Parallel|
|Commutative?|Yes (a⋅b=b⋅a)|No (a×b=−b×a)|



## Cosine similarity
 $$\text{Similarity}(\mathbf{A}, \mathbf{B}) = \cos(\theta) = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A_i^2} \sqrt{\sum_{i=1}^{n} B_i^2}}$$


### The Data 
 We will use the "updated" vectors we calculated after one step of training:
* Car (Vector A): $[0.23, 0.17]
* $Bus (Vector B): $[-0.46, 0.49]$2. 

The Three-Step Calculation

**Step A:Calculate the Dot Product ($A \cdot B$)**\
Multiply the $x$ coordinates, multiply the $y$ coordinates, and add them up.

$$(0.23 \times -0.46) + (0.17 \times 0.49)$$
$$-0.1058 + 0.0833 = \mathbf{-0.0225}$$

**Step B:Calculate the Magnitudes (Lengths)**

We use the Pythagorean theorem ($\sqrt{x^2 + y^2}$) for each.

* **Magnitude A (Car):** $\sqrt{0.23^2 + 0.17^2} = \sqrt{0.0529 + 0.0289} = \mathbf{0.286}$

* **Magnitude B (Bus):** $\sqrt{(-0.46)^2 + 0.49^2} = \sqrt{0.2116 + 0.2401} = \mathbf{0.672}$

**Step C: The Final Division**

Divide the Dot Product by the product of the Magnitudes:

$$\text{Similarity} = \frac{-0.0225}{0.286 \times 0.672} = \frac{-0.0225}{0.192} \approx \mathbf{-0.11}$$

A score of -0.11 is very close to 0.

### How to Interpret the Score
The result is always a number between -1 and 1:

* 1 (Angle is 0°): The vectors are identical in direction. In AI, this means the words/documents have the exact same meaning.

* 0 (Angle is 90°): The vectors are "orthogonal" (perpendicular). They are completely unrelated (like "Blockchain" and "Bananas").

* -1 (Angle is 180°): The vectors are perfect opposites. (In word embeddings, scores usually stay between 0 and 1).

### What this tells us: 
After only one single update of training, the computer still thinks "Car" and "Bus" are unrelated (orthogonal). They started in different "quadrants" of our graph.

**Why?** Because the vectors started with random numbers. One update isn't enough to pull them together.

### What happens in a real Semantic Search?
In a real system like Google:

1. The training runs for millions of iterations.

2. The vectors eventually move so that they are pointing in almost the exact same direction.

3. Their Cosine Similarity score would eventually climb from -0.11 to something like 0.85 or 0.95







## Blob post/ LinkedIn post

### Semantic Search: How AI "Understands" the World

As holiday season is actually going on, I realised how come my phone is able to club all the dinner photos together and present them to me. One could argue I am late in asking this question, as this feature has been around for decades :D
Well, I say, better late then never :D 

For my research the key questions was: How is my phone able to understand the photos? 

Turns out it is smart use of maths (vectors) and oversimiplifaction explanation is:
1. Traverse the new text or image data point
2. Generate the data (Embedding)
    - Because computer do not understand pixels on screen or words, only numbers.
3. Perform the dot multiplication or cosine similarity on those vectors (Cosine Similarity)
    - It is our way to mathematically figure out how similar or dissimilar the two vectors are.
4. Find the nearest neighbour of the searched keyword and suggest the recommendation (Vector Databases)
    - Once all the data points are suggest the closest member.

**Futrue work: How the databases & search algorithms are able to do this at scale and which indexing algorithem  are they using?**

Have you ever wondered why Google can find a "car" when you search for "fast vehicle," even if the word "car" isn't on the page? The secret lies in a fascinating blend of high-dimensional math and a "neighborhood" logic known as **Semantic Search**.

In this post, we’ll break down the three pillars of modern AI search: **Embeddings**, **Cosine Similarity**, and **Vector Databases**.

---

### 1. Embeddings: Turning Words into a Map

Computers don't understand letters; they understand numbers. To bridge this gap, we use **Vector Embeddings**.

An embedding is a list of coordinates that places a word on a giant "meaning map."

* **The Logic:** Words that "hang out" in the same sentences (like *Bus* and *Driver*) are nudged closer together by an AI.
* **The Weirdness:** Sometimes, this map picks up on unexpected traits. In our experiments, a **Bus** and a **Banana** ended up closer than expected simply because they are both "Yellow" and "Oblong."

### 2. Cosine Similarity: The AI's Compass

Once words are on the map, how do we know how close they are? We use **Cosine Similarity**.

Instead of measuring the distance with a ruler, we measure the **angle** between two vectors.

* **1.0 Score:** The words are "twins" (e.g., *Automobile* and *Car*).
* **0.5 Score:** They are "cousins" (e.g., *Bus* and *Car*—both vehicles).
* **0.0 Score:** They are "strangers" (e.g., *Bus* and *Tuesday*).

### 3. Semantic Search: Finding the Needle in the Haystack

**Semantic Search** is the engine that puts this math to work. When you type a query, the system:

1. **Vectorizes** your query into a coordinate.
2. **Scans** a **Vector Database** (a specialized library for these numbers).
3. **Calculates** the cosine similarity between your query and millions of documents.

Because it searches by *intent* rather than *characters*, it can find matches that keyword-based search would miss entirely.

---

### Why It Matters

This technology is the backbone of everything from **Netflix recommendations** to **ChatGPT**. It allows machines to grasp the nuance of human language—even if it occasionally gets distracted by the fact that school buses and bananas are both yellow!

---

### Summary Table for the Reader

| Concept | What it is | Role |
| --- | --- | --- |
| **Embedding** | A list of numbers (coordinates) | Defines the "Meaning" |
| **Cosine Similarity** | An angular measurement | Calculates "Relationship" |
| **Vector Database** | A high-speed storage system | Enables "Search" |
---


![alt text](image.png)

If you would like to see the jupyter notebook directly [Google colab link](https://colab.research.google.com/drive/16irp5ndxugWszjS_5MLyHDJqy9oF2UA1?usp=sharing)

Jupyter notebook can be found on github [cosine_similarity.ipynb](https://github.com/spShashankGit/Dev-Journal/blob/main/cosine_similarity.ipynb)
