import { Component, OnInit } from '@angular/core';
import { Task } from '../../models';
import { TaskService } from '../../services/task.service';

/*
❌ BAD EXAMPLE (Violating SRP):
This component would violate SRP if it handled:
- UI logic
- Business logic  
- Data access
- Validation

@Component({
  selector: 'app-bad-task-list',
  template: `...`
})
export class BadTaskListComponent {
  tasks: Task[] = [];
  
  constructor() {
    // Violates SRP: Component handling data access directly
    this.loadTasksFromLocalStorage();
  }
  
  addTask(title: string, description: string): void {
    // Violates SRP: Component handling business logic
    const task: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      priority: 'medium',
      createdAt: new Date()
    };
    
    // Violates SRP: Component handling validation
    if (!this.validateTask(task)) {
      alert('Invalid task data');
      return;
    }
    
    this.tasks.push(task);
    
    // Violates SRP: Component handling persistence
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    
    // Violates SRP: Component handling notifications
    alert('Task added successfully!');
  }
  
  private loadTasksFromLocalStorage(): void {
    const stored = localStorage.getItem('tasks');
    this.tasks = stored ? JSON.parse(stored) : [];
  }
  
  private validateTask(task: Task): boolean {
    return task.title.length > 0 && task.description.length > 0;
  }
}
*/

// ✅ GOOD EXAMPLE: Following SRP
// Component only handles UI logic and delegates to services
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
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
  
  filterTasksByPriority(priority: Task['priority']): Task[] {
    return this.tasks.filter(task => task.priority === priority);
  }
  
  // SRP: Component only handles UI-related logic
  private loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }
  
  private resetForm(): void {
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.selectedPriority = 'medium';
  }
}