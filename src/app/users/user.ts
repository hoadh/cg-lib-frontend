export interface User {
  id?: number;
  phone: string;
  name: string;
  username?: string;
  password?: string;
  created_at?: string;
  library_id?: number;
  library?: any;
}
