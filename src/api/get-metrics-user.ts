import { api } from "../services/axios";

export async function apiGetMetricsUser() {
  try {
    const response = await api.get("/users/metrics");
    return response.data
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("INTERNAL ERROR SERVER");
  }
}