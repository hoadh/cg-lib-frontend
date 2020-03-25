import { BookStatus } from './book-status';
export interface Book {
  id?: number;
  title: string;
  authors: string;
  isbn?: string;
  category_id?: number;
  category?: any;
  library_id: string;
  library?: any;
  status_id?: number;
  status?: BookStatus;
  publishing_company?: string;
  ages?: string;
}
