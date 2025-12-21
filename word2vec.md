
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
