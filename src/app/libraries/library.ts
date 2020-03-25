export interface Library {
  id?: number;
  name: string;
  address: string;
  phone: number;
  desc?: string;
  image?: File;
  manager?: string;
  manager_address?: string;
  manager_phone?: number;
}
