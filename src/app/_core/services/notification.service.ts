import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSubject = new Subject<Notification>();

  constructor() { }

  show(notification: Notification): void {
    this.messageSubject.next(notification);
  }

  showError(message: string): void {
    this.messageSubject.next({type: 'error', message});
  }

  getSubject(): Subject<Notification> {
    return this.messageSubject;
  }

}
