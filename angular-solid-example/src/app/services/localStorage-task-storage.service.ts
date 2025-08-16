import { Injectable } from '@angular/core';
import { Task } from '../models';
import { TaskStorage } from './interfaces';

// SRP: Only responsible for localStorage operations
// LSP: Can be substituted wherever TaskStorage is expected
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