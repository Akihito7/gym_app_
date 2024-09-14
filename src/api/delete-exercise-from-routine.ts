import { api } from "../services/axios";

export async function apiDeleteExerciseFromRoutine(exerciseId: number) {
  try {
    const response = await api.delete(`/routines/exercise/${exerciseId}`);
    return response;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("INTERNAL ERROR SERVER");
  }
}