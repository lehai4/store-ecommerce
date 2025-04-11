export interface UserLogin {
  email: string;
  password: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  roleId: string;
  status: boolean;
}

export interface Role {
  _id: string;
  nameRole: string;
}

export interface Category {
  _id: string;
  nameCategory: string;
  description: string;
}

export interface Product {
  _id: string;
  nameProduct: string;
  IDCategory: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
  description: string;
  status: boolean;
}
