import http from "@/api/http";
import { User } from "@/types/admin";

export const apiConnect = {
  getRoles: async () => {
    try {
      const response = await http.get("/roles");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUsers: async () => {
    try {
      const response = await http.get("/users");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createUser: async (data: User) => {
    try {
      const response = await http.post("/users", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteUser: async (id: string) => {
    try {
      const response = await http.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateUser: async (data: User) => {
    try {
      const response = await http.put(`/users/${data._id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
