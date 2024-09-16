import { api } from "../services/axios";

export async function apiGetManyRoutines() {
  try {
    const response = await api.get("/routines");
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}