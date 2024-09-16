import { api } from "../services/axios";

export async function apiGetUser() {
  try {
    const response = await api.get(`/users`);
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}