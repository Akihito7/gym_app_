import { api } from "../services/axios";

export async function apiDeleteRoutine(routineId: number) {
  try {
    const response = await api.delete(`/routines/${routineId}`);
    return response.data
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("INTERNAL ERROR SERVER");
  }
} 