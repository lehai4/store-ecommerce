import http from "@/api/http";
import { UserLogin } from "@/types/admin";

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
};
