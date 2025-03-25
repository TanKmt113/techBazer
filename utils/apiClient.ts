import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const API_BASE_URL = "http://localhost:3001";

export const useApiClient = () => {
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${Cookies.get("token") || ""}`
  };

  const handleError = (error: AxiosError) => {
    console.error("API Error:", error);

    if (error.response?.status === 401) {
      console.error("Lỗi xác thực! Chuyển hướng về trang đăng nhập.");
      router.push("/sign-in"); // Thay thế navigateTo bằng router.push
    } else if (error.response?.status === 403) {
      console.error("Bạn không có quyền truy cập.");
    } else if (error.response?.status === 404) {
      console.error("Không tìm thấy tài nguyên.");
    } else {
      console.error("Lỗi không xác định:", error.message);
    }
    throw error;
  };

  const get = async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    try {
      const response = await axios.get<T>(`${API_BASE_URL}${endpoint}`, { headers, params });
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
      throw error;
    }
  };

  
  const post = async <T>(endpoint: string, body: Record<string, any> | FormData): Promise<T> => {
    try {
      const isFormData = body instanceof FormData; // Kiểm tra xem có phải FormData không
      const response = await axios.post<T>(
        `${API_BASE_URL}${endpoint}`,
        body,
        {
          headers: {
            ...headers,
            ...(isFormData ? {} : { "Content-Type": "application/json" }), // Bỏ Content-Type nếu là FormData
          },
        }
      );
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
      throw error;
    }
  };
  

  const put = async <T>(endpoint: string, body: Record<string, any>): Promise<T> => {
    try {
      const response = await axios.put<T>(`${API_BASE_URL}${endpoint}`, body, { headers });
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
      throw error;
    }
  };

  const del = async <T>(endpoint: string): Promise<T> => {
    try {
      const response = await axios.delete<T>(`${API_BASE_URL}${endpoint}`, { headers });
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
      throw error;
    }
  };

  return { get, post, put, del };
};
