import { Injectable } from '@angular/core';
import { NotificationSender, Logger } from './interfaces';

// SRP: Only handles toast notifications
@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService implements NotificationSender {
  send(message: string, type: 'info' | 'success' | 'error'): void {
    // In a real app, this would integrate with a toast library like ngx-toastr
    const className = `toast-${type}`;
    const toast = document.createElement('div');
    toast.className = className;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      z-index: 1000;
      background-color: ${this.getBackgroundColor(type)};
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
  }
  
  private getBackgroundColor(type: 'info' | 'success' | 'error'): string {
    switch (type) {
      case 'success': return '#4CAF50';
      case 'error': return '#F44336';
      case 'info': return '#2196F3';
      default: return '#2196F3';
    }
  }
}

// SRP: Only handles console logging
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