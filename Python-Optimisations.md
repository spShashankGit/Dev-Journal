# List comprehension vs map() Which is faster in python and why?

When two things have the same **Big O complexity**, it means they scale the same way as data grows, but it doesn't mean they run at the same **literal speed** (clock time).

In Python, **List Comprehension** is generally faster than `map()` for two main reasons:

### 1. The "Function Call" Overhead

In Python, calling a function is relatively "expensive" in terms of CPU cycles.

* **`map(lambda x: x[0], data)`**: For every single item in your list, Python has to stop, set up a new function scope for the `lambda`, execute it, and return. If you have 1 million items, you just performed 1 million manual function calls.
* **`[x[0] for x in data]`**: This happens almost entirely at the C-level (the language Python is built on). It’s a specialized instruction that doesn't need to "call" a function for every index access; it just grabs the value.

### 2. Bytecode Optimization

The Python interpreter recognizes the list comprehension pattern and optimizes it into a very tight loop. `map()`, however, is a general-purpose tool that can't be optimized as aggressively because it doesn't know what the function you passed it is going to do.

### How this compares to TypeScript

In **TypeScript/JavaScript**, the situation is different:

* Engines like **V8 (Chrome/Node.js)** are incredibly good at optimizing `.map()`.
* In TS, `.map()` is the standard, idiomatic way to transform data.
* In Python, because of the specific way its interpreter (CPython) works, the "syntax" of list comprehension is actually a performance feature.

---

### Summary of Differences

| Feature | Python List Comp | Python `map()` | TS `.map()` |
| --- | --- | --- | --- |
| **Complexity** | $O(n)$ | $O(n)$ | $O(n)$ |
| **Execution** | Optimized C-loop | Repeated Function Calls | JIT Optimized |
| **Readability** | High (Pythonic) | Medium | High (Standard) |

**The Verdict:** If you are writing Python, use **List Comprehension**. It’s faster and more "Pythonic." If you are writing TypeScript, stick with `.map()`.



# Experiment results
List Comprehension: 0.1591 seconds

Map with Lambda: 0.3925 seconds

## Code
``` python
 data = [[i, i+1] for i in range(1000)]
        list_comp_time = timeit.timeit(
            stmt="[x[0] for x in data]", 
            setup="data = " + str(data), # This 'injects' the data
            number=10000
        )

        # Test Map with Lambda
            # Wrap the operation in a lambda so it 'remembers' the data variable
        list_comp_time = timeit.timeit(lambda: [x[0] for x in data], number=10000)
        map_time = timeit.timeit(lambda: list(map(lambda x: x[0], data)), number=10000)

        print(f"List Comprehension: {list_comp_time:.4f} seconds")
        print(f"Map with Lambda: {map_time:.4f} seconds")

```
