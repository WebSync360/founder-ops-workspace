export type Status = 'active' | 'pending' | 'completed' | 'urgent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'online' | 'offline';
  lastActive: string;
}

export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  status: Status;
  assignee: string;
}

export interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}