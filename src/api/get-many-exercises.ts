import { api } from "../services/axios";

export async function apiGetManyExercises() {
  try {
    const response = await api.get("/exercises");
    return response.data
  } catch (error : any) {
    throw new Error(error.message)
  }
}