import http from "@/api/http";
import { UserLogin, UserRegister } from "@/types/admin";

export const apiUser = {
  login: async (data: UserLogin) => {
    try {
      const response = await http.post("/users/login", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  register: async (data: UserRegister) => {
    try {
      const response = await http.post("/users/register", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
