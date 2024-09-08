import { RoutinesDTO } from "../dtos/routines";
import { api } from "../services/axios";

export async function fetchRoutines(userId: string) {
  try {
    const response = await api.get(`routine/list/${userId}`);
    console.log(response.data)
    return response.data as RoutinesDTO[]
  } catch (error) {
    console.log(error)
  }
}