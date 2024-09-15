import { api } from "../services/axios";

export async function apiUpdateDetails(routineId : number, routineName: string) {
  try {
    const response = await api.patch(`/routines/${routineId}`, {
      name : routineName
    })
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("INTERNAL ERROR SERVER");
  }
}