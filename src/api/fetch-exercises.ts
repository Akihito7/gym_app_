import { ExercisesLibraryDTO } from "../dtos/exercises-library";
import { api } from "../services/axios";

export async function fetchExercises(){
  const response = await api.get("exercises");
  return response.data as ExercisesLibraryDTO[]
}