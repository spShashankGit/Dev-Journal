# DRY Principle in Coding

## What is the DRY Principle?

**DRY** stands for **"Don't Repeat Yourself"** - a fundamental principle in software development that emphasizes avoiding duplication of code, logic, and information throughout a system.

The DRY principle was formulated by Andy Hunt and Dave Thomas in their book "The Pragmatic Programmer" and states:

> "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."

## Core Concept

The essence of DRY is that you should avoid writing the same code, logic, or information in multiple places. Instead, you should:

- **Extract common functionality** into reusable functions, methods, or modules
- **Create single sources of truth** for data and business logic
- **Use abstraction** to eliminate redundancy

## Why is DRY Important?

### Benefits of Following DRY:

1. **Maintainability**: Changes only need to be made in one place
2. **Consistency**: Reduces the risk of inconsistent behavior across the application
3. **Debugging**: Easier to locate and fix bugs when logic exists in only one place
4. **Code Quality**: Results in cleaner, more organized code
5. **Development Speed**: Faster development once reusable components are established

### Problems with Code Duplication:

1. **Maintenance Nightmare**: Bug fixes require changes in multiple places
2. **Inconsistency**: Different copies may evolve differently over time
3. **Higher Bug Risk**: More places for errors to hide
4. **Increased Development Time**: More code to write and test

## Code Examples

### ❌ Violating DRY Principle

```javascript
// Bad: Repeated validation logic
function createUser(userData) {
    if (!userData.email || !userData.email.includes('@')) {
        throw new Error('Invalid email');
    }
    if (!userData.password || userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
    }
    // Create user logic...
}

function updateUser(userId, userData) {
    if (!userData.email || !userData.email.includes('@')) {
        throw new Error('Invalid email');
    }
    if (!userData.password || userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
    }
    // Update user logic...
}
```

### ✅ Following DRY Principle

```javascript
// Good: Extracted validation logic
function validateUser(userData) {
    if (!userData.email || !userData.email.includes('@')) {
        throw new Error('Invalid email');
    }
    if (!userData.password || userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
    }
}

function createUser(userData) {
    validateUser(userData);
    // Create user logic...
}

function updateUser(userId, userData) {
    validateUser(userData);
    // Update user logic...
}
```

### Another Example: Database Connections

#### ❌ Violating DRY:
```python
# Bad: Repeated database connection code
def get_users():
    connection = mysql.connector.connect(
        host='localhost',
        user='admin',
        password='password',
        database='myapp'
    )
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users")
    result = cursor.fetchall()
    connection.close()
    return result

def get_products():
    connection = mysql.connector.connect(
        host='localhost',
        user='admin',
        password='password',
        database='myapp'
    )
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM products")
    result = cursor.fetchall()
    connection.close()
    return result
```

#### ✅ Following DRY:
```python
# Good: Extracted database connection logic
class DatabaseManager:
    def __init__(self):
        self.config = {
            'host': 'localhost',
            'user': 'admin',
            'password': 'password',
            'database': 'myapp'
        }
    
    def execute_query(self, query):
        connection = mysql.connector.connect(**self.config)
        cursor = connection.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        connection.close()
        return result

db = DatabaseManager()

def get_users():
    return db.execute_query("SELECT * FROM users")

def get_products():
    return db.execute_query("SELECT * FROM products")
```

## Common Ways to Apply DRY

### 1. Functions and Methods
Extract repeated code blocks into reusable functions.

### 2. Constants and Configuration
Store repeated values in constants or configuration files.

```javascript
// Instead of:
const API_URL = 'https://api.example.com';
// scattered throughout the code

// Use:
const CONFIG = {
    API_URL: 'https://api.example.com',
    TIMEOUT: 5000,
    MAX_RETRIES: 3
};
```

### 3. Utility Classes/Modules
Create utility classes for common operations.

### 4. Templates and Inheritance
Use templates or inheritance to avoid repeating similar structures.

### 5. Data Normalization
In databases, normalize data to avoid storing the same information multiple times.

## When NOT to Apply DRY

### Premature Abstraction
Don't force DRY if the code pieces are similar but serve different purposes or may evolve differently.

### Rule of Three
Consider the "Rule of Three": Don't extract common code until you have at least three instances of duplication.

### Context Matters
Sometimes apparent duplication is actually different concepts that happen to look similar.

## DRY vs. Other Principles

### DRY and WET (Write Everything Twice)
Some developers advocate for writing code twice before extracting, to ensure the abstraction is truly needed.

### DRY and SOLID Principles
DRY works well with SOLID principles, particularly:
- **Single Responsibility Principle**: Each function/class has one reason to change
- **Open/Closed Principle**: Code is open for extension but closed for modification

## Best Practices

1. **Start Simple**: Don't over-engineer from the beginning
2. **Refactor Gradually**: Extract common code as patterns emerge
3. **Document Abstractions**: Make sure your abstractions are well-documented
4. **Test Thoroughly**: Ensure your extracted code works in all contexts
5. **Consider Context**: Not all similar-looking code should be merged

## Conclusion

The DRY principle is a powerful tool for creating maintainable, efficient code. However, like all principles, it should be applied thoughtfully. The goal is to reduce meaningful duplication while maintaining code clarity and flexibility.

Remember: **DRY is about knowledge and intent, not just lines of code.**