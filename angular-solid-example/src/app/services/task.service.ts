import { Injectable } from '@angular/core';
import { Task } from '../models';
import { TaskStorage, NotificationSender, Logger } from './interfaces';

/*
❌ BAD EXAMPLE (Violating SRP, DIP):
This service violates multiple SOLID principles:
- SRP: Mixes business logic with storage and notification concerns
- DIP: Directly depends on localStorage and alert() instead of abstractions

@Injectable()
export class BadTaskService {
  private tasks: Task[] = [];
  
  constructor() {
    // Violates DIP: Direct dependency on localStorage
    this.loadTasksFromLocalStorage();
  }
  
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
    private taskStorage: TaskStorage,           // DIP: Depends on abstraction
    private notificationService: NotificationSender, // DIP: Depends on abstraction
    private logger: Logger                      // DIP: Depends on abstraction
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