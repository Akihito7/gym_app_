import { api } from "../services/axios";

export async function apiDeleteRoutine(routineId: number) {
  try {
    const response = await api.delete(`/routines/${routineId}`);
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
} 