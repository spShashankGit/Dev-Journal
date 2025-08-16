// Task model interface
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
}

// User model interface
export interface User {
  id: string;
  name: string;
  email: string;
}