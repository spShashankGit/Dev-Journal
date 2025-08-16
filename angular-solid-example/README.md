# Angular SOLID Principles Example

This is a practical demonstration of SOLID principles in an Angular task management application.

## Project Structure

```
src/app/
├── models/                    # Data models and interfaces
│   └── index.ts              # Task and User interfaces
├── services/                  # Business logic and data access
│   ├── interfaces/           # Service abstractions (ISP)
│   │   └── index.ts         # TaskStorage, NotificationSender, Logger interfaces
│   ├── task.service.ts      # Core business logic (SRP, DIP)
│   ├── localStorage-task-storage.service.ts  # Storage implementation (SRP, LSP)
│   └── notification-logger.services.ts       # Notification & logging (SRP, ISP)
├── components/               # UI components
│   └── task-list/           # Task list component (SRP)
│       ├── task-list.component.ts
│       ├── task-list.component.html
│       └── task-list.component.css
└── app.module.ts            # Dependency injection configuration (DIP)
```

## SOLID Principles Demonstrated

### Single Responsibility Principle (SRP)
- **TaskService**: Only handles task business logic
- **LocalStorageTaskService**: Only handles localStorage operations  
- **ToastNotificationService**: Only handles notifications
- **ConsoleLoggerService**: Only handles logging
- **TaskListComponent**: Only handles UI logic

### Open/Closed Principle (OCP)
- New storage implementations can be added without modifying existing code
- New notification types can be added by implementing `NotificationSender`
- New logging mechanisms can be added by implementing `Logger`

### Liskov Substitution Principle (LSP)
- Any `TaskStorage` implementation can be substituted without breaking the system
- All notification services implementing `NotificationSender` work interchangeably
- Logger implementations are fully substitutable

### Interface Segregation Principle (ISP)
- **TaskStorage**: Focused on data operations only
- **NotificationSender**: Focused on sending notifications only  
- **Logger**: Focused on logging operations only
- No service is forced to implement methods it doesn't need

### Dependency Inversion Principle (DIP)
- High-level `TaskService` depends on abstractions (`TaskStorage`, `NotificationSender`, `Logger`)
- Concrete implementations are injected through Angular's DI system
- Easy to swap implementations for different environments (dev/test/prod)

## Key Features

### Good Code Examples (✅)
- Proper separation of concerns
- Dependency injection with abstractions
- Interface-based design
- Single responsibility per class/service

### Bad Code Examples (❌) 
- Commented examples showing SOLID violations
- Direct dependencies on concrete classes
- Mixed responsibilities in single classes
- Tight coupling between components

## Running the Example

1. Install Angular CLI: `npm install -g @angular/cli`
2. Create new project: `ng new task-management`
3. Copy the files from this example into your project
4. Install dependencies: `npm install`
5. Run the application: `ng serve`

## Extension Points

Thanks to SOLID principles, this application can be easily extended:

### New Storage Options
```typescript
// Add API storage
export class ApiTaskStorageService implements TaskStorage {
  // Implementation for REST API
}

// Add database storage  
export class DatabaseTaskStorageService implements TaskStorage {
  // Implementation for database
}
```

### New Notification Types
```typescript
// Add email notifications
export class EmailNotificationService implements NotificationSender {
  // Implementation for email
}

// Add SMS notifications
export class SmsNotificationService implements NotificationSender {
  // Implementation for SMS
}
```

### New Logging Options
```typescript
// Add file logging
export class FileLoggerService implements Logger {
  // Implementation for file logging
}

// Add remote logging
export class RemoteLoggerService implements Logger {
  // Implementation for remote logging service
}
```

## Testing Benefits

SOLID principles make testing much easier:

```typescript
// Easy to mock dependencies for unit testing
describe('TaskService', () => {
  let service: TaskService;
  let mockStorage: jasmine.SpyObj<TaskStorage>;
  let mockNotification: jasmine.SpyObj<NotificationSender>;
  let mockLogger: jasmine.SpyObj<Logger>;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('TaskStorage', ['saveTask', 'getTasks']);
    const notificationSpy = jasmine.createSpyObj('NotificationSender', ['send']);
    const loggerSpy = jasmine.createSpyObj('Logger', ['log', 'error']);

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: TaskStorage, useValue: storageSpy },
        { provide: NotificationSender, useValue: notificationSpy },
        { provide: Logger, useValue: loggerSpy }
      ]
    });

    service = TestBed.inject(TaskService);
    mockStorage = TestBed.inject(TaskStorage) as jasmine.SpyObj<TaskStorage>;
    mockNotification = TestBed.inject(NotificationSender) as jasmine.SpyObj<NotificationSender>;
    mockLogger = TestBed.inject(Logger) as jasmine.SpyObj<Logger>;
  });

  it('should add task successfully', async () => {
    mockStorage.saveTask.and.returnValue(Promise.resolve());
    
    await service.addTask('Test Task', 'Test Description');
    
    expect(mockStorage.saveTask).toHaveBeenCalled();
    expect(mockNotification.send).toHaveBeenCalledWith('Task added successfully!', 'success');
    expect(mockLogger.log).toHaveBeenCalled();
  });
});
```

This example demonstrates how SOLID principles lead to more maintainable, testable, and extensible code.