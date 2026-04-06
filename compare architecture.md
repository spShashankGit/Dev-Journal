

``` JS
function layered() {
  return controller();

  function controller() {
    return service();
  }

  function service() {
    return repository();
  }

  function repository() {
    return 42;
  }
}
'''

''' JS
function hexagonal() {
  return controller();

  function controller() {
    return useCase();
  }

  function useCase() {
    return domainLogic(port);
  }

  function domainLogic(portFn) {
    return portFn();
  }

  function port() {
    return adapter();
  }

  function adapter() {
    return 42;
  }
}
'''


''' JS
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

suite
  .add('Layered', layered)
  .add('Hexagonal', hexagonal)
  .on('cycle', event => console.log(String(event.target)))
  .run();
'''

Category	Architectures
❌ Non-hexagonal	Layered, Transaction Script
✅ Hexagonal family	Hexagonal, Clean, Onion


Key shift:
Layered: business logic depends on infrastructure
Hexagonal: infrastructure depends on business logic

## Potential arguments
Layered Architecture optimizes for:
Simplicity
Fast onboarding
Low upfront cost
Hexagonal Architecture optimizes for:
Changeability
Testability
Long-term maintainability


## Dummy table
📊 Quantified comparison (this is what you wanted)
Metric	Layered	Hexagonal
Initial dev speed	⭐⭐⭐⭐⭐	⭐⭐⭐
Change cost (later)	High	Low
Test isolation	Poor	Excellent
Coupling	High	Low
Boilerplate	Low	High
Cognitive load	Low	Medium



## Structure of architectural discussion

> “Architecture A is better for X goal under Y constraints”

Compare architectures with numbers
Example: Monolith vs Microservices
Metric	Monolith	Microservices
Latency	20ms (in-process)	50–150ms (network overhead)
Deploy time	1 deployment	N deployments
Scaling cost	Scale whole system	Scale only hot services
Dev teams	1–2 teams	5+ teams
Failure impact	Full system	Partial (isolated)


⚔️ Side-by-side comparison with measurable impact
1. Change cost (most important metric)
Scenario:
Change database from MySQL → MongoDB
Metric	3-Tier (layered)	Hexagonal
Files touched	20–50	5–10
Risk of regression	High	Low
Time to change	2–5 days	0.5–2 days
👉 Why?
3-tier often leaks DB logic into service layers
Hexagonal isolates DB behind ports
2. Testability (huge in real systems)
Scenario:
Run business logic tests without DB
Metric	3-Tier	Hexagonal
Unit test speed	Slow (needs mocks everywhere)	Fast
Test runtime	5–30s	<1–5s
Mock complexity	High	Low
👉 Hexagonal allows pure domain testing (no infrastructure)
3. Performance overhead
Here’s where people get it wrong—hexagonal is NOT free.
Metric	3-Tier	Hexagonal
Latency overhead	~0ms	+1–5ms (extra abstraction layers)
Memory	Lower	Slightly higher
Call depth	Shallow	Deeper
👉 The overhead is usually negligible unless you're at extreme scale.
4. Complexity (this is the real trade-off)
Metric	3-Tier	Hexagonal
Initial setup time	1–2 days	3–7 days
Learning curve	Low	Medium–High
Boilerplate code	Low	Higher
👉 Hexagonal adds:
Interfaces (ports)
Adapters
Dependency inversion
5. Maintainability over time
After ~6 months of development:
Metric	3-Tier	Hexagonal
Code coupling	High	Low
Refactoring effort	High	Medium
Bug surface area	Larger	Smaller
👉 This is where Hexagonal wins long-term
6. Team scalability
Metric	3-Tier	Hexagonal
Parallel work	Limited	High
Merge conflicts	Frequent	Reduced
Ownership boundaries	Blurry	Clear

