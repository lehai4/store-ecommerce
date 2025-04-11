import http from "@/api/http";
import { Category, Product, User } from "@/types/admin";

export const apiConnect = {
  // Products
  getProducts: async () => {
    try {
      const response = await http.get("/admin/products");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createProduct: async (data: Product) => {
    try {
      const response = await http.post("/admin/products", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateProduct: async (data: Product) => {
    try {
      const response = await http.put(`/admin/products/${data._id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteProduct: async (id: string) => {
    try {
      const response = await http.delete(`/admin/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  uploadImage: async (data: FormData) => {
    try {
      const response = await http.post("/admin/products/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Users
  getRoles: async () => {
    try {
      const response = await http.get("/admin/roles");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUsers: async () => {
    try {
      const response = await http.get("/admin/users");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createUser: async (data: User) => {
    try {
      const response = await http.post("/admin/users", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteUser: async (id: string) => {
    try {
      const response = await http.delete(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateUser: async (data: User) => {
    try {
      const response = await http.put(`/admin/users/${data._id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const response = await http.get("/admin/categories");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createCategory: async (data: Category) => {
    try {
      const response = await http.post("/admin/categories", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateCategory: async (data: Category) => {
    try {
      const response = await http.put(`/admin/categories/${data._id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteCategory: async (id: string) => {
    try {
      const response = await http.delete(`/admin/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
