# Circuit Breaker Pattern

AWS article on Circuit breaker:

https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html


Martin Fowler article: https://martinfowler.com/bliki/CircuitBreaker.html

### Background
The architecture of Circuit breaker was popularise by Michael Nygard in his book Release it.

### Necessity to look for a solution
Local calls are different than remote calls. Remote calls are bound to fail due to network or latency. If there is one system that is a supplier system that is being called by many clients then this will lead to cascading failures across multiple systems.

### Circuit breaker
The solution is Circuit breaker architecture. [State: Open]
The idea is very simple, wrap a protected function call in a circuit breaker object, which monitors for failures. Once the failure is reach a certain threshold, the circuit breaker trips, and all future calls to the circuit breaker returns with an error.
The circuit breaker do not make call to the protected system at all.
Having an alert for circuit breaker trip would be a good practice.

<img width="558" height="882" alt="Image" src="https://github.com/user-attachments/assets/cdfe563f-44d2-46c3-a569-042d8710f9d1" />

Self healing breaker [State: Closed]
We can program the circuit to call the protected system after a suitable interval, and resetting the breaks should it succeed.

<img width="450" height="406" alt="Image" src="https://github.com/user-attachments/assets/7085e7d6-3cb9-4d8a-bbb9-fe2422ffb5f6" />

Assuming the circuit recovered and the switch is flipped. We are now entering into the third state [State: half_open]
In this state the system make the trial call, which will either reset the breaker if successful or restart the timeout if not.



### Gotcha!
1. Not all failures should trip the circuit and be accepted as part of the normal failure and should be dealt as part of the regular logic.
2. Use promises for remote calls as they are slow, it is a good idea to put each call on a different thread using promise. Arrange for the circuit to break when the thread pool is exhausted.

### Trip the breaker
1. Simple: On the count when non zero breaks the circuit and when zero open the circuit.
2. Sophisticated approach: look for the frequency of errors, tripping once you get, say 50% failure rate. Or threshold of 10 for timeout but 3 for the connection failures.

### Circuit breaker and asynchronous call

Circuit breaks are also useful for async communications. A common technique is to pul all the request on a queue, which the supplier consumes at its speed - a useful technique to avoid overloading servers.
In this case the circuit breaks when the queue fills up.


### Is circuit breaker for me if I am not connected to any unreliable service?

Yes, Circuit breaker help reduce resources tied up in operations which are likely to fail.
By avoiding waiting for timeout by client.
And you do not send request to the struggling server.


### Circuit breaker can be used inside the system too
Circuit breaker pattern can be used in any situation where we want to protect parts of a system being affected by the failure in other parts of the system.

### Circuit breaker also helps in monitoring 
Logging & Tracking the state change of a circuit breaker can be a reliable indicator for the failure inside the system.
Operational team should be able to trip or reset the breaker.


### Further reading
Netflix share useful information on improving reliability.

Netflix also open-sourced their software Hystrix - a tool for dealing with latency & fault tolerance for distributed system. This tool has an implementation of the circuit breaker pattern with the thread pool limit.
