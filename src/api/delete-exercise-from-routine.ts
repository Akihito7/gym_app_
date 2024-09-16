import { api } from "../services/axios";

export async function apiDeleteExerciseFromRoutine(exerciseId: number) {
  try {
    const response = await api.delete(`/routines/exercise/${exerciseId}`);
    return response;
  } catch (error: any) {
    throw new Error(error.message)
  }
}