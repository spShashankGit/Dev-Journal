# SOLID Principles in Software Development

## What are SOLID Principles?

**SOLID** is an acronym that represents five fundamental principles of object-oriented programming and design. These principles, when applied together, make software designs more understandable, flexible, and maintainable.

The five principles are:
- **S** - Single Responsibility Principle (SRP)
- **O** - Open/Closed Principle (OCP)
- **L** - Liskov Substitution Principle (LSP)
- **I** - Interface Segregation Principle (ISP)
- **D** - Dependency Inversion Principle (DIP)

## History and Creator

The SOLID principles were introduced by **Robert C. Martin** (also known as "Uncle Bob") in the early 2000s. Robert C. Martin is a renowned software engineer, author, and speaker who has made significant contributions to software development practices.

The principles were first presented in his paper "Design Principles and Design Patterns" (2000) and later popularized in his book "Agile Software Development: Principles, Patterns, and Practices" (2003). The SOLID acronym itself was coined by Michael Feathers.

## Why Were SOLID Principles Needed?

### The Problem with Traditional Object-Oriented Design

Before SOLID principles, many object-oriented systems suffered from:

1. **Rigidity**: Hard to change because every change affects too many other parts
2. **Fragility**: Changes break unexpected parts of the system
3. **Immobility**: Hard to reuse components in other applications
4. **Viscosity**: Easier to hack than to maintain good design
5. **Needless Complexity**: Over-engineering and unnecessary abstractions

### The Solution: SOLID Principles

SOLID principles address these issues by providing guidelines that:

- **Reduce coupling** between system components
- **Increase cohesion** within individual components
- **Improve maintainability** and readability
- **Enable easier testing** through better separation of concerns
- **Facilitate code reuse** and extensibility
- **Make systems more resilient to change**

## The Five SOLID Principles

### 1. Single Responsibility Principle (SRP)

**Definition**: A class should have only one reason to change, meaning it should have only one job or responsibility.

#### Why SRP Matters:
- **Easier maintenance**: Changes to one responsibility don't affect others
- **Better testability**: Smaller, focused classes are easier to test
- **Improved readability**: Code purpose is clearer
- **Reduced coupling**: Classes depend on fewer things

#### TypeScript Examples:

```typescript
// ❌ Bad: Violates SRP - Multiple responsibilities
class User {
    constructor(
        public name: string,
        public email: string
    ) {}

    // Responsibility 1: User data management
    updateEmail(newEmail: string): void {
        this.email = newEmail;
    }

    // Responsibility 2: Email sending (should not be here)
    sendWelcomeEmail(): void {
        // Email sending logic
        console.log(`Sending welcome email to ${this.email}`);
    }

    // Responsibility 3: Data persistence (should not be here)
    saveToDatabase(): void {
        // Database logic
        console.log(`Saving user ${this.name} to database`);
    }
}

// ✅ Good: Following SRP - Single responsibility per class
class User {
    constructor(
        public name: string,
        public email: string
    ) {}

    updateEmail(newEmail: string): void {
        this.email = newEmail;
    }
}

class EmailService {
    sendWelcomeEmail(user: User): void {
        console.log(`Sending welcome email to ${user.email}`);
    }
}

class UserRepository {
    save(user: User): void {
        console.log(`Saving user ${user.name} to database`);
    }
}
```

#### Python Examples:

```python
# ❌ Bad: Violates SRP
class Employee:
    def __init__(self, name: str, position: str, salary: float):
        self.name = name
        self.position = position
        self.salary = salary
    
    # Responsibility 1: Employee data
    def get_employee_info(self) -> str:
        return f"{self.name} - {self.position}"
    
    # Responsibility 2: Salary calculation (should be separate)
    def calculate_pay(self) -> float:
        # Complex calculation logic
        return self.salary * 0.8  # After taxes
    
    # Responsibility 3: Report generation (should be separate)
    def generate_report(self) -> str:
        return f"Employee Report: {self.name}, Pay: ${self.calculate_pay()}"

# ✅ Good: Following SRP
class Employee:
    def __init__(self, name: str, position: str, salary: float):
        self.name = name
        self.position = position
        self.salary = salary
    
    def get_employee_info(self) -> str:
        return f"{self.name} - {self.position}"

class PayrollCalculator:
    def calculate_pay(self, employee: Employee) -> float:
        return employee.salary * 0.8

class ReportGenerator:
    def __init__(self, payroll_calculator: PayrollCalculator):
        self.payroll_calculator = payroll_calculator
    
    def generate_employee_report(self, employee: Employee) -> str:
        pay = self.payroll_calculator.calculate_pay(employee)
        return f"Employee Report: {employee.name}, Pay: ${pay}"
```

### 2. Open/Closed Principle (OCP)

**Definition**: Software entities should be open for extension but closed for modification. You should be able to add new functionality without changing existing code.

#### Why OCP Matters:
- **Reduces risk**: Don't modify working code
- **Enables extensibility**: Easy to add new features
- **Improves maintainability**: Changes are isolated
- **Promotes reusability**: Existing code can be reused in new contexts

#### TypeScript Examples:

```typescript
// ❌ Bad: Violates OCP - Need to modify existing code for new shapes
class AreaCalculator {
    calculateArea(shapes: any[]): number {
        let totalArea = 0;
        
        for (const shape of shapes) {
            if (shape.type === 'rectangle') {
                totalArea += shape.width * shape.height;
            } else if (shape.type === 'circle') {
                totalArea += Math.PI * shape.radius * shape.radius;
            }
            // Adding new shapes requires modifying this method
        }
        
        return totalArea;
    }
}

// ✅ Good: Following OCP - Open for extension, closed for modification
interface Shape {
    calculateArea(): number;
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}
    
    calculateArea(): number {
        return this.width * this.height;
    }
}

class Circle implements Shape {
    constructor(private radius: number) {}
    
    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

// New shapes can be added without modifying existing code
class Triangle implements Shape {
    constructor(private base: number, private height: number) {}
    
    calculateArea(): number {
        return 0.5 * this.base * this.height;
    }
}

class AreaCalculator {
    calculateArea(shapes: Shape[]): number {
        return shapes.reduce((total, shape) => total + shape.calculateArea(), 0);
    }
}
```

#### Python Examples:

```python
# ❌ Bad: Violates OCP
class DiscountCalculator:
    def calculate_discount(self, customer_type: str, amount: float) -> float:
        if customer_type == "regular":
            return amount * 0.1
        elif customer_type == "premium":
            return amount * 0.2
        elif customer_type == "vip":
            return amount * 0.3
        # Adding new customer types requires modifying this method
        return 0

# ✅ Good: Following OCP
from abc import ABC, abstractmethod

class Customer(ABC):
    @abstractmethod
    def calculate_discount(self, amount: float) -> float:
        pass

class RegularCustomer(Customer):
    def calculate_discount(self, amount: float) -> float:
        return amount * 0.1

class PremiumCustomer(Customer):
    def calculate_discount(self, amount: float) -> float:
        return amount * 0.2

class VIPCustomer(Customer):
    def calculate_discount(self, amount: float) -> float:
        return amount * 0.3

# New customer types can be added without modifying existing code
class CorporateCustomer(Customer):
    def calculate_discount(self, amount: float) -> float:
        return amount * 0.25

class DiscountCalculator:
    def calculate_discount(self, customer: Customer, amount: float) -> float:
        return customer.calculate_discount(amount)
```

### 3. Liskov Substitution Principle (LSP)

**Definition**: Objects of a superclass should be replaceable with objects of its subclasses without breaking the application. Subtypes must be substitutable for their base types.

#### Why LSP Matters:
- **Ensures polymorphism works correctly**
- **Maintains contract integrity**
- **Prevents unexpected behavior**
- **Enables safe inheritance**

#### TypeScript Examples:

```typescript
// ❌ Bad: Violates LSP - Square changes Rectangle behavior
class Rectangle {
    constructor(protected width: number, protected height: number) {}
    
    setWidth(width: number): void {
        this.width = width;
    }
    
    setHeight(height: number): void {
        this.height = height;
    }
    
    getArea(): number {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    constructor(side: number) {
        super(side, side);
    }
    
    // Violates LSP: Changes the behavior of Rectangle
    setWidth(width: number): void {
        this.width = width;
        this.height = width; // Side effect not expected in Rectangle
    }
    
    setHeight(height: number): void {
        this.width = height; // Side effect not expected in Rectangle
        this.height = height;
    }
}

// This function expects Rectangle behavior but breaks with Square
function processRectangle(rectangle: Rectangle): void {
    rectangle.setWidth(5);
    rectangle.setHeight(10);
    // Expected area: 50, but Square will give 100
    console.log(`Area: ${rectangle.getArea()}`);
}

// ✅ Good: Following LSP - Using composition and proper abstraction
interface Shape {
    getArea(): number;
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}
    
    getArea(): number {
        return this.width * this.height;
    }
}

class Square implements Shape {
    constructor(private side: number) {}
    
    getArea(): number {
        return this.side * this.side;
    }
}

// Both can be used interchangeably through the Shape interface
function processShape(shape: Shape): void {
    console.log(`Area: ${shape.getArea()}`);
}
```

#### Python Examples:

```python
# ❌ Bad: Violates LSP
class Bird:
    def fly(self) -> None:
        print("Flying...")

class Sparrow(Bird):
    def fly(self) -> None:
        print("Sparrow flying...")

class Penguin(Bird):
    def fly(self) -> None:
        # Violates LSP: Penguins can't fly!
        raise Exception("Penguins cannot fly!")

def make_bird_fly(bird: Bird) -> None:
    bird.fly()  # This will fail for Penguin

# ✅ Good: Following LSP - Proper abstraction
from abc import ABC, abstractmethod

class Bird(ABC):
    @abstractmethod
    def move(self) -> None:
        pass

class FlyingBird(Bird):
    def move(self) -> None:
        self.fly()
    
    def fly(self) -> None:
        print("Flying...")

class SwimmingBird(Bird):
    def move(self) -> None:
        self.swim()
    
    def swim(self) -> None:
        print("Swimming...")

class Sparrow(FlyingBird):
    def fly(self) -> None:
        print("Sparrow flying...")

class Penguin(SwimmingBird):
    def swim(self) -> None:
        print("Penguin swimming...")

def make_bird_move(bird: Bird) -> None:
    bird.move()  # Works correctly for all bird types
```

### 4. Interface Segregation Principle (ISP)

**Definition**: Clients should not be forced to depend on interfaces they do not use. Create specific, focused interfaces rather than large, general-purpose ones.

#### Why ISP Matters:
- **Reduces coupling**: Classes only depend on what they need
- **Improves maintainability**: Changes to unused interface methods don't affect clients
- **Enhances flexibility**: Easier to implement only required functionality
- **Better testability**: Smaller interfaces are easier to mock

#### TypeScript Examples:

```typescript
// ❌ Bad: Violates ISP - Fat interface forces unnecessary dependencies
interface Worker {
    work(): void;
    eat(): void;
    sleep(): void;
    code(): void;
    design(): void;
}

class Developer implements Worker {
    work(): void { console.log("Writing code"); }
    eat(): void { console.log("Eating lunch"); }
    sleep(): void { console.log("Sleeping"); }
    code(): void { console.log("Coding applications"); }
    design(): void { 
        // Developer forced to implement design method they don't use
        throw new Error("Developers don't design");
    }
}

class Designer implements Worker {
    work(): void { console.log("Creating designs"); }
    eat(): void { console.log("Eating lunch"); }
    sleep(): void { console.log("Sleeping"); }
    code(): void { 
        // Designer forced to implement code method they don't use
        throw new Error("Designers don't code");
    }
    design(): void { console.log("Designing interfaces"); }
}

// ✅ Good: Following ISP - Segregated interfaces
interface Workable {
    work(): void;
}

interface Eatable {
    eat(): void;
}

interface Sleepable {
    sleep(): void;
}

interface Codeable {
    code(): void;
}

interface Designable {
    design(): void;
}

class Developer implements Workable, Eatable, Sleepable, Codeable {
    work(): void { console.log("Writing code"); }
    eat(): void { console.log("Eating lunch"); }
    sleep(): void { console.log("Sleeping"); }
    code(): void { console.log("Coding applications"); }
}

class Designer implements Workable, Eatable, Sleepable, Designable {
    work(): void { console.log("Creating designs"); }
    eat(): void { console.log("Eating lunch"); }
    sleep(): void { console.log("Sleeping"); }
    design(): void { console.log("Designing interfaces"); }
}
```

#### Python Examples:

```python
# ❌ Bad: Violates ISP
from abc import ABC, abstractmethod

class Machine(ABC):
    @abstractmethod
    def print_document(self, document: str) -> None:
        pass
    
    @abstractmethod
    def scan_document(self) -> str:
        pass
    
    @abstractmethod
    def fax_document(self, document: str) -> None:
        pass

class SimplePrinter(Machine):
    def print_document(self, document: str) -> None:
        print(f"Printing: {document}")
    
    def scan_document(self) -> str:
        # Forced to implement unused functionality
        raise NotImplementedError("Simple printer cannot scan")
    
    def fax_document(self, document: str) -> None:
        # Forced to implement unused functionality
        raise NotImplementedError("Simple printer cannot fax")

# ✅ Good: Following ISP
class Printable(ABC):
    @abstractmethod
    def print_document(self, document: str) -> None:
        pass

class Scannable(ABC):
    @abstractmethod
    def scan_document(self) -> str:
        pass

class Faxable(ABC):
    @abstractmethod
    def fax_document(self, document: str) -> None:
        pass

class SimplePrinter(Printable):
    def print_document(self, document: str) -> None:
        print(f"Printing: {document}")

class AllInOnePrinter(Printable, Scannable, Faxable):
    def print_document(self, document: str) -> None:
        print(f"Printing: {document}")
    
    def scan_document(self) -> str:
        return "Scanned document content"
    
    def fax_document(self, document: str) -> None:
        print(f"Faxing: {document}")
```

### 5. Dependency Inversion Principle (DIP)

**Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

#### Why DIP Matters:
- **Reduces coupling**: High-level code doesn't depend on implementation details
- **Improves testability**: Easy to mock dependencies
- **Enhances flexibility**: Can swap implementations easily
- **Enables dependency injection**: Framework support for managing dependencies

#### TypeScript Examples:

```typescript
// ❌ Bad: Violates DIP - High-level module depends on low-level module
class MySQLDatabase {
    save(data: string): void {
        console.log(`Saving to MySQL: ${data}`);
    }
}

class UserService {
    private database: MySQLDatabase; // Direct dependency on concrete class
    
    constructor() {
        this.database = new MySQLDatabase(); // Tight coupling
    }
    
    createUser(userData: string): void {
        // Business logic
        this.database.save(userData);
    }
}

// ✅ Good: Following DIP - Depend on abstractions
interface Database {
    save(data: string): void;
}

class MySQLDatabase implements Database {
    save(data: string): void {
        console.log(`Saving to MySQL: ${data}`);
    }
}

class PostgreSQLDatabase implements Database {
    save(data: string): void {
        console.log(`Saving to PostgreSQL: ${data}`);
    }
}

class UserService {
    constructor(private database: Database) {} // Depends on abstraction
    
    createUser(userData: string): void {
        // Business logic
        this.database.save(userData);
    }
}

// Usage with dependency injection
const mysqlDb = new MySQLDatabase();
const postgresDb = new PostgreSQLDatabase();

const userService1 = new UserService(mysqlDb);
const userService2 = new UserService(postgresDb);
```

#### Python Examples:

```python
# ❌ Bad: Violates DIP
class EmailService:
    def send_email(self, message: str) -> None:
        print(f"Sending email: {message}")

class NotificationService:
    def __init__(self):
        self.email_service = EmailService()  # Direct dependency
    
    def send_notification(self, message: str) -> None:
        self.email_service.send_email(message)

# ✅ Good: Following DIP
from abc import ABC, abstractmethod

class MessageSender(ABC):
    @abstractmethod
    def send(self, message: str) -> None:
        pass

class EmailService(MessageSender):
    def send(self, message: str) -> None:
        print(f"Sending email: {message}")

class SMSService(MessageSender):
    def send(self, message: str) -> None:
        print(f"Sending SMS: {message}")

class PushNotificationService(MessageSender):
    def send(self, message: str) -> None:
        print(f"Sending push notification: {message}")

class NotificationService:
    def __init__(self, message_sender: MessageSender):
        self.message_sender = message_sender  # Depends on abstraction
    
    def send_notification(self, message: str) -> None:
        self.message_sender.send(message)

# Usage
email_service = EmailService()
sms_service = SMSService()
push_service = PushNotificationService()

notification_service1 = NotificationService(email_service)
notification_service2 = NotificationService(sms_service)
notification_service3 = NotificationService(push_service)
```

## Angular Project Example: Task Management Application

Let's create a small Angular project that demonstrates SOLID principles with both bad and good code examples.

### Project Structure

```
task-management/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   ├── task.model.ts
│   │   │   └── user.model.ts
│   │   ├── services/
│   │   │   ├── interfaces/
│   │   │   │   ├── task-storage.interface.ts
│   │   │   │   ├── notification.interface.ts
│   │   │   │   └── logger.interface.ts
│   │   │   ├── task.service.ts
│   │   │   ├── notification.service.ts
│   │   │   ├── localStorage-task-storage.service.ts
│   │   │   └── console-logger.service.ts
│   │   ├── components/
│   │   │   ├── task-list/
│   │   │   │   ├── task-list.component.ts
│   │   │   │   └── task-list.component.html
│   │   │   └── task-item/
│   │   │       ├── task-item.component.ts
│   │   │       └── task-item.component.html
│   │   └── app.component.ts
│   └── main.ts
```

### Implementation Files

#### Models

```typescript
// models/task.model.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
}

// models/user.model.ts
export interface User {
  id: string;
  name: string;
  email: string;
}
```

#### Service Interfaces (ISP)

```typescript
// services/interfaces/task-storage.interface.ts
export interface TaskStorage {
  getTasks(): Promise<Task[]>;
  saveTask(task: Task): Promise<void>;
  updateTask(task: Task): Promise<void>;
  deleteTask(id: string): Promise<void>;
}

// services/interfaces/notification.interface.ts
export interface NotificationSender {
  send(message: string, type: 'info' | 'success' | 'error'): void;
}

// services/interfaces/logger.interface.ts
export interface Logger {
  log(message: string): void;
  error(message: string): void;
}
```

#### Services Following SOLID Principles

```typescript
// services/task.service.ts - SRP: Only handles task business logic
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskStorage } from './interfaces/task-storage.interface';
import { NotificationSender } from './interfaces/notification.interface';
import { Logger } from './interfaces/logger.interface';

/*
❌ BAD EXAMPLE (Violating SRP, DIP):
@Injectable()
export class BadTaskService {
  private tasks: Task[] = [];
  
  constructor() {
    // Violates DIP: Direct dependency on localStorage
    this.loadTasksFromLocalStorage();
  }
  
  // Violates SRP: Mixing business logic with storage logic
  addTask(title: string, description: string): void {
    const task: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      priority: 'medium',
      createdAt: new Date()
    };
    
    this.tasks.push(task);
    
    // Violates SRP: Service shouldn't handle storage directly
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    
    // Violates SRP: Service shouldn't handle notifications directly
    alert('Task added successfully!');
    
    // Violates SRP: Service shouldn't handle logging directly
    console.log(`Task added: ${task.title}`);
  }
  
  private loadTasksFromLocalStorage(): void {
    const stored = localStorage.getItem('tasks');
    this.tasks = stored ? JSON.parse(stored) : [];
  }
}
*/

// ✅ GOOD EXAMPLE: Following SRP, DIP, OCP
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  
  constructor(
    private taskStorage: TaskStorage,      // DIP: Depends on abstraction
    private notificationService: NotificationSender, // DIP: Depends on abstraction
    private logger: Logger                 // DIP: Depends on abstraction
  ) {
    this.loadTasks();
  }
  
  // SRP: Only business logic for task management
  async addTask(title: string, description: string, priority: Task['priority'] = 'medium'): Promise<void> {
    const task: Task = {
      id: this.generateId(),
      title,
      description,
      completed: false,
      priority,
      createdAt: new Date()
    };
    
    try {
      await this.taskStorage.saveTask(task);
      this.tasks.push(task);
      this.notificationService.send('Task added successfully!', 'success');
      this.logger.log(`Task added: ${task.title}`);
    } catch (error) {
      this.notificationService.send('Failed to add task', 'error');
      this.logger.error(`Failed to add task: ${error}`);
    }
  }
  
  async updateTask(updatedTask: Task): Promise<void> {
    try {
      await this.taskStorage.updateTask(updatedTask);
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
      this.notificationService.send('Task updated successfully!', 'success');
      this.logger.log(`Task updated: ${updatedTask.title}`);
    } catch (error) {
      this.notificationService.send('Failed to update task', 'error');
      this.logger.error(`Failed to update task: ${error}`);
    }
  }
  
  async deleteTask(id: string): Promise<void> {
    try {
      await this.taskStorage.deleteTask(id);
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.notificationService.send('Task deleted successfully!', 'success');
      this.logger.log(`Task deleted: ${id}`);
    } catch (error) {
      this.notificationService.send('Failed to delete task', 'error');
      this.logger.error(`Failed to delete task: ${error}`);
    }
  }
  
  getTasks(): Task[] {
    return [...this.tasks]; // Return copy to prevent external mutation
  }
  
  getTasksByPriority(priority: Task['priority']): Task[] {
    return this.tasks.filter(task => task.priority === priority);
  }
  
  private async loadTasks(): Promise<void> {
    try {
      this.tasks = await this.taskStorage.getTasks();
    } catch (error) {
      this.logger.error(`Failed to load tasks: ${error}`);
    }
  }
  
  private generateId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

#### Storage Implementation (DIP, LSP)

```typescript
// services/localStorage-task-storage.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskStorage } from './interfaces/task-storage.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageTaskService implements TaskStorage {
  private readonly STORAGE_KEY = 'tasks';
  
  async getTasks(): Promise<Task[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      throw new Error(`Failed to load tasks from localStorage: ${error}`);
    }
  }
  
  async saveTask(task: Task): Promise<void> {
    try {
      const tasks = await this.getTasks();
      tasks.push(task);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      throw new Error(`Failed to save task to localStorage: ${error}`);
    }
  }
  
  async updateTask(updatedTask: Task): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const index = tasks.findIndex(t => t.id === updatedTask.id);
      if (index === -1) {
        throw new Error('Task not found');
      }
      tasks[index] = updatedTask;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      throw new Error(`Failed to update task in localStorage: ${error}`);
    }
  }
  
  async deleteTask(id: string): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const filteredTasks = tasks.filter(t => t.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredTasks));
    } catch (error) {
      throw new Error(`Failed to delete task from localStorage: ${error}`);
    }
  }
}

// Alternative implementation for API storage (OCP)
@Injectable()
export class ApiTaskStorageService implements TaskStorage {
  constructor(private http: HttpClient) {}
  
  async getTasks(): Promise<Task[]> {
    return this.http.get<Task[]>('/api/tasks').toPromise();
  }
  
  async saveTask(task: Task): Promise<void> {
    await this.http.post('/api/tasks', task).toPromise();
  }
  
  async updateTask(task: Task): Promise<void> {
    await this.http.put(`/api/tasks/${task.id}`, task).toPromise();
  }
  
  async deleteTask(id: string): Promise<void> {
    await this.http.delete(`/api/tasks/${id}`).toPromise();
  }
}
```

#### Additional Services

```typescript
// services/notification.service.ts - SRP: Only handles notifications
import { Injectable } from '@angular/core';
import { NotificationSender } from './interfaces/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService implements NotificationSender {
  send(message: string, type: 'info' | 'success' | 'error'): void {
    // In a real app, this would integrate with a toast library
    const className = `toast-${type}`;
    const toast = document.createElement('div');
    toast.className = className;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  }
}

// services/console-logger.service.ts - SRP: Only handles logging
import { Injectable } from '@angular/core';
import { Logger } from './interfaces/logger.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerService implements Logger {
  log(message: string): void {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
  }
  
  error(message: string): void {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
  }
}
```

#### Component Implementation

```typescript
// components/task-list/task-list.component.ts - SRP: Only handles task list UI
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';
  newTaskDescription = '';
  selectedPriority: Task['priority'] = 'medium';
  
  constructor(private taskService: TaskService) {} // DIP: Depends on abstraction
  
  ngOnInit(): void {
    this.loadTasks();
  }
  
  async addTask(): Promise<void> {
    if (this.newTaskTitle.trim()) {
      await this.taskService.addTask(
        this.newTaskTitle.trim(),
        this.newTaskDescription.trim(),
        this.selectedPriority
      );
      this.resetForm();
      this.loadTasks();
    }
  }
  
  async onTaskUpdate(task: Task): Promise<void> {
    await this.taskService.updateTask(task);
    this.loadTasks();
  }
  
  async onTaskDelete(taskId: string): Promise<void> {
    await this.taskService.deleteTask(taskId);
    this.loadTasks();
  }
  
  private loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }
  
  private resetForm(): void {
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.selectedPriority = 'medium';
  }
}
```

#### Dependency Injection Configuration

```typescript
// app.module.ts - Proper DI configuration
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

import { TaskService } from './services/task.service';
import { TaskStorage } from './services/interfaces/task-storage.interface';
import { LocalStorageTaskService } from './services/localStorage-task-storage.service';
import { NotificationSender } from './services/interfaces/notification.interface';
import { ToastNotificationService } from './services/notification.service';
import { Logger } from './services/interfaces/logger.interface';
import { ConsoleLoggerService } from './services/console-logger.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    TaskService,
    // DIP: Bind abstractions to concrete implementations
    { provide: TaskStorage, useClass: LocalStorageTaskService },
    { provide: NotificationSender, useClass: ToastNotificationService },
    { provide: Logger, useClass: ConsoleLoggerService }
    
    // Easy to swap implementations:
    // { provide: TaskStorage, useClass: ApiTaskStorageService },
    // { provide: NotificationSender, useClass: EmailNotificationService },
    // { provide: Logger, useClass: FileLoggerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## GitHub Projects That Enforce SOLID Principles

### 1. **Angular Framework** (https://github.com/angular/angular)
- **Requirements**: Strict adherence to SOLID principles
- **Documentation**: Comprehensive style guide emphasizing separation of concerns
- **Examples**: Dependency injection system, modular architecture
- **Enforcement**: Detailed code review process and architectural guidelines

### 2. **Spring Framework** (https://github.com/spring-projects/spring-framework)
- **Requirements**: DIP through extensive use of dependency injection
- **Documentation**: Inversion of Control container documentation
- **Examples**: Bean configuration, aspect-oriented programming
- **Enforcement**: Framework design inherently promotes SOLID principles

### 3. **ASP.NET Core** (https://github.com/dotnet/aspnetcore)
- **Requirements**: Built-in dependency injection and interface-based design
- **Documentation**: Architectural guidance following SOLID principles
- **Examples**: Middleware pipeline, service registration
- **Enforcement**: Framework conventions and best practices

### 4. **NestJS** (https://github.com/nestjs/nest)
- **Requirements**: Decorator-based dependency injection system
- **Documentation**: Extensive guides on modular architecture
- **Examples**: Guards, interceptors, pipes following ISP
- **Enforcement**: TypeScript decorators enforce proper abstractions

### 5. **Clean Architecture Template** (https://github.com/jasontaylordev/CleanArchitecture)
- **Requirements**: Strict layered architecture following SOLID
- **Documentation**: Complete template with SOLID examples
- **Examples**: Domain-driven design implementation
- **Enforcement**: Project structure enforces separation of concerns

### 6. **Onion Architecture** (https://github.com/amitpnk/Onion-architecture-ASP.NET-Core)
- **Requirements**: Dependency inversion at its core
- **Documentation**: Detailed explanation of each layer
- **Examples**: Repository pattern, service layer abstraction
- **Enforcement**: Project template structure

## Best Practices for Applying SOLID Principles

### 1. Start with Single Responsibility
- **Identify multiple reasons for change** in existing classes
- **Extract responsibilities** into separate classes
- **Focus on cohesion** within each class

### 2. Design for Extension
- **Use interfaces and abstract classes** for extensibility
- **Prefer composition over inheritance**
- **Plan for future requirements** without over-engineering

### 3. Respect Contracts
- **Ensure substitutability** in inheritance hierarchies
- **Maintain behavioral compatibility** in implementations
- **Document preconditions and postconditions**

### 4. Keep Interfaces Focused
- **Create role-based interfaces** rather than large general ones
- **Group related methods** logically
- **Avoid forcing clients to depend on unused methods**

### 5. Depend on Abstractions
- **Use dependency injection** frameworks and patterns
- **Program to interfaces** rather than concrete classes
- **Invert control flow** for better testability

### 6. Continuous Refactoring
- **Apply SOLID principles gradually** during refactoring
- **Use automated tools** for code analysis
- **Regular code reviews** to ensure adherence

### 7. Testing Strategy
- **Write unit tests** for individual responsibilities
- **Use mocking** for dependencies
- **Test behavior** rather than implementation

## Common Anti-Patterns to Avoid

### 1. God Objects
Large classes that violate SRP by handling multiple responsibilities.

### 2. Tight Coupling
Direct dependencies on concrete classes instead of abstractions.

### 3. Violation of LSP
Subclasses that break the expected behavior of parent classes.

### 4. Fat Interfaces
Large interfaces that force clients to implement unused methods.

### 5. High-Level Depending on Low-Level
Business logic directly depending on infrastructure concerns.

## Conclusion

SOLID principles are fundamental guidelines that lead to more maintainable, flexible, and robust software designs. When applied correctly, they:

- **Improve code maintainability** by reducing coupling and increasing cohesion
- **Enable easier testing** through better separation of concerns
- **Facilitate code reuse** and extensibility
- **Reduce the risk of bugs** through clear responsibilities and contracts
- **Make systems more resilient to change**

### Key Takeaways:

1. **SRP**: One class, one responsibility, one reason to change
2. **OCP**: Open for extension, closed for modification
3. **LSP**: Subtypes must be substitutable for base types
4. **ISP**: Many specific interfaces are better than one general interface
5. **DIP**: Depend on abstractions, not concretions

Remember, SOLID principles should be applied thoughtfully and pragmatically. The goal is not to follow them blindly, but to create better software designs that serve both current and future needs.

**Start small, refactor gradually, and always consider the specific context of your application.**