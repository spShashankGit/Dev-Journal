# Circuit Breaker Pattern

## What is the Circuit Breaker Pattern?

The Circuit Breaker pattern is a design pattern used in software engineering to detect failures and encapsulate the logic of preventing a failure from constantly recurring during maintenance, temporary external system failure, or unexpected system difficulties.

Just like an electrical circuit breaker protects electrical circuits from damage caused by excess current, the software circuit breaker pattern protects services from cascading failures when calling external services or resources.

## Problem it Solves

In distributed systems and microservices architectures, services often depend on external resources like:
- Database connections
- Web service calls
- File system operations
- Network resources

When these external resources become slow or unresponsive, it can cause:
- **Cascading failures**: One slow service can bring down the entire system
- **Resource exhaustion**: Threads get tied up waiting for timeouts
- **Poor user experience**: Long response times and timeouts
- **System instability**: Memory leaks and resource contention

## How Circuit Breaker Works

The Circuit Breaker pattern has three main states:

### 1. Closed State (Normal Operation)
- All requests pass through to the external service
- Success and failure counts are monitored
- If failure rate exceeds a threshold, circuit opens

### 2. Open State (Failure Mode)
- All requests fail immediately without calling the external service
- Returns a cached response, default value, or error
- After a timeout period, moves to Half-Open state

### 3. Half-Open State (Testing)
- Limited number of test requests are allowed through
- If requests succeed, circuit closes (back to normal)
- If requests fail, circuit opens again

## Key Components

### Failure Threshold
- Number or percentage of failures that triggers the circuit to open
- Example: Open circuit after 5 consecutive failures or 50% failure rate

### Timeout Period
- How long the circuit stays open before testing recovery
- Example: Stay open for 60 seconds before allowing test requests

### Recovery Strategy
- How to determine if the external service has recovered
- Usually involves allowing a small number of test requests

## Benefits

1. **Fast Failure**: Prevents slow operations from tying up resources
2. **Graceful Degradation**: System continues to function with reduced capability
3. **Automatic Recovery**: Self-healing when external service recovers
4. **Resource Protection**: Prevents thread pool exhaustion
5. **Better User Experience**: Quick responses instead of long timeouts

## Implementation Examples

### Simple Python Implementation

```python
import time
from enum import Enum
from typing import Callable, Any

class CircuitState(Enum):
    CLOSED = "CLOSED"
    OPEN = "OPEN"
    HALF_OPEN = "HALF_OPEN"

class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=60, expected_exception=Exception):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.expected_exception = expected_exception
        
        self.failure_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED
    
    def call(self, func: Callable, *args, **kwargs) -> Any:
        if self.state == CircuitState.OPEN:
            if self._should_attempt_reset():
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except self.expected_exception as e:
            self._on_failure()
            raise e
    
    def _should_attempt_reset(self) -> bool:
        return (time.time() - self.last_failure_time) >= self.recovery_timeout
    
    def _on_success(self):
        self.failure_count = 0
        self.state = CircuitState.CLOSED
    
    def _on_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN

# Usage Example
def unreliable_service():
    # Simulate an unreliable external service
    import random
    if random.random() < 0.7:  # 70% chance of failure
        raise Exception("Service unavailable")
    return "Success!"

circuit_breaker = CircuitBreaker(failure_threshold=3, recovery_timeout=30)

try:
    result = circuit_breaker.call(unreliable_service)
    print(f"Result: {result}")
except Exception as e:
    print(f"Error: {e}")
```

### Java Implementation with Fallback

```java
public class CircuitBreaker {
    private final int failureThreshold;
    private final long recoveryTimeout;
    private int failureCount;
    private long lastFailureTime;
    private CircuitState state = CircuitState.CLOSED;
    
    public enum CircuitState {
        CLOSED, OPEN, HALF_OPEN
    }
    
    public CircuitBreaker(int failureThreshold, long recoveryTimeout) {
        this.failureThreshold = failureThreshold;
        this.recoveryTimeout = recoveryTimeout;
    }
    
    public <T> T execute(Supplier<T> operation, Supplier<T> fallback) throws Exception {
        if (state == CircuitState.OPEN) {
            if (shouldAttemptReset()) {
                state = CircuitState.HALF_OPEN;
            } else {
                return fallback.get(); // Return fallback instead of failing
            }
        }
        
        try {
            T result = operation.get();
            onSuccess();
            return result;
        } catch (Exception e) {
            onFailure();
            return fallback.get();
        }
    }
    
    private boolean shouldAttemptReset() {
        return (System.currentTimeMillis() - lastFailureTime) >= recoveryTimeout;
    }
    
    private void onSuccess() {
        failureCount = 0;
        state = CircuitState.CLOSED;
    }
    
    private void onFailure() {
        failureCount++;
        lastFailureTime = System.currentTimeMillis();
        
        if (failureCount >= failureThreshold) {
            state = CircuitState.OPEN;
        }
    }
}
```

## Real-World Use Cases

### 1. Database Connection Protection
```python
# Protect against database timeouts
db_circuit_breaker = CircuitBreaker(failure_threshold=3, recovery_timeout=120)

def get_user_data(user_id):
    try:
        return db_circuit_breaker.call(database.fetch_user, user_id)
    except:
        # Return cached data or default response
        return get_cached_user_data(user_id)
```

### 2. External API Calls
```python
# Protect against third-party service failures
api_circuit_breaker = CircuitBreaker(failure_threshold=5, recovery_timeout=300)

def get_weather_data(location):
    try:
        return api_circuit_breaker.call(weather_api.get_forecast, location)
    except:
        # Return last known weather or default message
        return {"message": "Weather data temporarily unavailable"}
```

### 3. File System Operations
```python
# Protect against disk I/O issues
file_circuit_breaker = CircuitBreaker(failure_threshold=2, recovery_timeout=60)

def save_user_preferences(user_id, preferences):
    try:
        return file_circuit_breaker.call(file_system.save, user_id, preferences)
    except:
        # Queue for later processing or use in-memory storage
        queue_for_later_save(user_id, preferences)
        return True
```

## Best Practices

### 1. Choose Appropriate Thresholds
- **Failure threshold**: Balance between sensitivity and stability (typically 3-10 failures)
- **Recovery timeout**: Allow enough time for service recovery (30 seconds to 5 minutes)

### 2. Implement Proper Fallbacks
- Cached responses
- Default values
- Graceful degradation
- Queue for later processing

### 3. Monitor and Alert
- Track circuit breaker state changes
- Monitor failure rates and recovery times
- Set up alerts for when circuits open

### 4. Configuration
- Make thresholds configurable
- Allow runtime adjustment
- Different settings for different services

### 5. Testing
- Test failure scenarios
- Verify fallback mechanisms
- Test recovery behavior

## Advanced Features

### Exponential Backoff
Gradually increase the recovery timeout to avoid overwhelming recovering services:

```python
class AdvancedCircuitBreaker(CircuitBreaker):
    def __init__(self, *args, max_timeout=300, backoff_multiplier=2, **kwargs):
        super().__init__(*args, **kwargs)
        self.max_timeout = max_timeout
        self.backoff_multiplier = backoff_multiplier
        self.current_timeout = self.recovery_timeout
    
    def _on_failure(self):
        super()._on_failure()
        if self.state == CircuitState.OPEN:
            self.current_timeout = min(
                self.current_timeout * self.backoff_multiplier,
                self.max_timeout
            )
    
    def _should_attempt_reset(self) -> bool:
        return (time.time() - self.last_failure_time) >= self.current_timeout
```

### Bulkhead Pattern Integration
Combine with bulkhead pattern to isolate different types of failures:

```python
class ServiceCircuitBreakers:
    def __init__(self):
        self.database_cb = CircuitBreaker(failure_threshold=3)
        self.payment_cb = CircuitBreaker(failure_threshold=5)
        self.email_cb = CircuitBreaker(failure_threshold=10)
    
    def get_user(self, user_id):
        return self.database_cb.call(database.get_user, user_id)
    
    def process_payment(self, payment_data):
        return self.payment_cb.call(payment_service.process, payment_data)
    
    def send_email(self, email_data):
        return self.email_cb.call(email_service.send, email_data)
```

## Popular Libraries and Frameworks

### Python
- **pybreaker**: Feature-rich circuit breaker implementation
- **tenacity**: Retry and circuit breaker library
- **circuit-breaker**: Simple circuit breaker implementation

### Java
- **Hystrix**: Netflix's circuit breaker library (maintenance mode)
- **Resilience4j**: Modern alternative to Hystrix
- **Spring Cloud Circuit Breaker**: Spring framework integration

### JavaScript/Node.js
- **opossum**: Circuit breaker for Node.js
- **circuit-breaker-js**: Lightweight implementation
- **brakes**: Express.js circuit breaker

### .NET
- **Polly**: Resilience and transient-fault-handling library
- **Microsoft.Extensions.Http.Polly**: Integration with HttpClient

## Circuit Breaker vs Other Patterns

### vs Timeout Pattern
- **Timeout**: Prevents hanging indefinitely
- **Circuit Breaker**: Prevents repeated attempts to failing services

### vs Retry Pattern  
- **Retry**: Attempts operation multiple times
- **Circuit Breaker**: Stops attempting when failure threshold is reached

### vs Bulkhead Pattern
- **Bulkhead**: Isolates resources to prevent total system failure
- **Circuit Breaker**: Protects against cascading failures from external dependencies

## Conclusion

The Circuit Breaker pattern is essential for building resilient distributed systems. It provides:

- **Fast failure detection and recovery**
- **Protection against cascading failures**
- **Improved system stability and user experience**
- **Automatic healing capabilities**

When implementing circuit breakers, focus on choosing appropriate thresholds, implementing proper fallback mechanisms, and monitoring the health of your services. This pattern, combined with other resilience patterns like retry and bulkhead, forms the foundation of robust microservices architectures.

## Further Reading

- [Martin Fowler's Circuit Breaker Article](https://martinfowler.com/bliki/CircuitBreaker.html)
- [Release It! by Michael Nygard](https://pragprog.com/titles/mnee2/release-it-second-edition/)
- [Building Microservices by Sam Newman](https://www.oreilly.com/library/view/building-microservices/9781491950340/)
- [Microservices Patterns by Chris Richardson](https://www.manning.com/books/microservices-patterns)