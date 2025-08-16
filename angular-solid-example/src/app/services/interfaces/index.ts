import { Task } from '../models';

// ISP: Focused interface for task storage operations
export interface TaskStorage {
  getTasks(): Promise<Task[]>;
  saveTask(task: Task): Promise<void>;
  updateTask(task: Task): Promise<void>;
  deleteTask(id: string): Promise<void>;
}

// ISP: Focused interface for notifications
export interface NotificationSender {
  send(message: string, type: 'info' | 'success' | 'error'): void;
}

// ISP: Focused interface for logging
export interface Logger {
  log(message: string): void;
  error(message: string): void;
}