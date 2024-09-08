import { RoutineWithDetailsDTO } from "../dtos/routine-with-details";
import { api } from "../services/axios";

export async function fetchRoutineWithDetails(routineId: string) {
  try {
    const response = await api.get(`routine/${routineId}`)
    return response.data as RoutineWithDetailsDTO
  } catch (error) {
      console.log(error)
  }

}