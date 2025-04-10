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
