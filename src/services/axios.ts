import axios from "axios"
import { AppError } from "../utils/app-error"

export const api = axios.create({
  baseURL : "http://192.168.1.7:3000"
})
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error) {
      const message = error?.response?.data?.message ?? "INTERNAL ERROR SERVER";
      const statusCode = error?.response?.data?.statusCode ?? 500;
      return Promise.reject(new AppError(message, statusCode));
    }
  }
);
