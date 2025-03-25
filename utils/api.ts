// apiClient.ts
import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:3001";
const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Authorization": `Bearer ${token || ""}`
  }
});

const handleError = (error: AxiosError) => {
  console.error("API Error:", error);
  throw error;
};

export const api = {
  get: async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    try {
      const response = await apiClient.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
      throw error;
    }
  },

  post: async <T>(endpoint: string, body: Record<string, any> | FormData): Promise<T> => {
    try {
      const isFormData = body instanceof FormData;
      const response = await apiClient.post<T>(endpoint, body, {
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" })
        }
      });
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
      throw error;
    }
  },

  put: async <T>(endpoint: string, body: Record<string, any>): Promise<T> => {
    try {
      const response = await apiClient.put<T>(endpoint, body);
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
      throw error;
    }
  },

  pat: async <T>(endpoint: string, body: Record<string, any>): Promise<T> => {
    try {
      const response = await apiClient.patch<T>(endpoint, body);
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
      throw error;
    }
  },

  del: async <T>(endpoint: string, body: Record<string, any>): Promise<T> => {
    try {
      console.log(body);
      
      const response = await apiClient.delete<T>(endpoint,{
        data: body, 
      });
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
      throw error;
    }
  }
};
