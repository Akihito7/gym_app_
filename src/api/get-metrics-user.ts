import { api } from "../services/axios";

export async function apiGetMetricsUser() {
  try {
    const response = await api.get("/users/metrics");
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}