import { api } from "../services/axios";

export async function apiGetManyExercises() {
  try {
    const response = await api.get("/exercises");
    return response.data
  } catch (error : any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("INTERNAL ERROR SERVER");
  }
}