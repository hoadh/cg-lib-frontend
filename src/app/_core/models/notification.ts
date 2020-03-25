export interface Notification {
  type?: 'success' | 'warning' | 'error';
  title?: string;
  message?: string;
}
