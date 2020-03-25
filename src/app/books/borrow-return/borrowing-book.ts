import { Book } from '../books/book';

export interface BorrowingBook {
  id?: number;
  student_name: string;
  student_code: string;
  school_name: string;
  class_name: string;
  book_id?: number;
  book?: Book;
  library_id?: number;
  borrow_day?: any;
  return_day?: any;
  pay_day?: any;
  created_at?: any;
  customer?: {
    id: number;
    name: string;
  };
}
