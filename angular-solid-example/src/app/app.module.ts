import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';

// Services
import { TaskService } from './services/task.service';

// Service Interfaces and Implementations (DIP Configuration)
import { TaskStorage } from './services/interfaces';
import { LocalStorageTaskService } from './services/localStorage-task-storage.service';
import { NotificationSender, Logger } from './services/interfaces';
import { ToastNotificationService, ConsoleLoggerService } from './services/notification-logger.services';

/*
❌ BAD EXAMPLE (Violating DIP):
If we configured services like this, we would violate DIP:

@NgModule({
  providers: [
    TaskService,
    LocalStorageTaskService,  // Direct concrete dependency
    ToastNotificationService, // Direct concrete dependency  
    ConsoleLoggerService      // Direct concrete dependency
  ]
})

This makes it impossible to swap implementations and violates the 
Dependency Inversion Principle.
*/

// ✅ GOOD EXAMPLE: Following DIP with proper abstraction binding
@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    TaskService,
    
    // DIP: Bind abstractions to concrete implementations
    // This allows easy swapping of implementations
    { provide: TaskStorage, useClass: LocalStorageTaskService },
    { provide: NotificationSender, useClass: ToastNotificationService },
    { provide: Logger, useClass: ConsoleLoggerService }
    
    // Easy to swap implementations for different environments:
    // Production might use:
    // { provide: TaskStorage, useClass: ApiTaskStorageService },
    // { provide: NotificationSender, useClass: EmailNotificationService },
    // { provide: Logger, useClass: FileLoggerService }
    //
    // Testing might use:
    // { provide: TaskStorage, useClass: MockTaskStorageService },
    // { provide: NotificationSender, useClass: MockNotificationService },
    // { provide: Logger, useClass: MockLoggerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
Benefits of this DIP configuration:

1. **Testability**: Easy to inject mock services for unit testing
2. **Flexibility**: Can swap implementations without changing business logic
3. **Maintainability**: Changes to concrete implementations don't affect consumers
4. **Environment-specific configuration**: Different implementations for dev/test/prod
5. **Following SOLID**: Adheres to Dependency Inversion Principle

Example of environment-specific configuration:

// environment.prod.ts
export const environment = {
  production: true,
  providers: [
    { provide: TaskStorage, useClass: ApiTaskStorageService },
    { provide: NotificationSender, useClass: EmailNotificationService },
    { provide: Logger, useClass: FileLoggerService }
  ]
};

// environment.dev.ts  
export const environment = {
  production: false,
  providers: [
    { provide: TaskStorage, useClass: LocalStorageTaskService },
    { provide: NotificationSender, useClass: ToastNotificationService },
    { provide: Logger, useClass: ConsoleLoggerService }
  ]
};
*/