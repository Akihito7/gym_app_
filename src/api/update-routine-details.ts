import { api } from "../services/axios";

export async function apiUpdateDetails(routineId : number, routineName: string) {
  try {
    const response = await api.patch(`/routines/${routineId}`, {
      name : routineName
    })
    return response.data;
  } catch (error: any) {
    throw new Error(error.message)
  }
}