import { api } from "../services/axios";

type ParamsApiCreateRoutine = {
  routineName: string;
}

export async function apiCreateRoutine({ routineName }: ParamsApiCreateRoutine) {
  try {
    const response = await api.post("/routines", { routineName });
    return response.data[0].id
  } catch (error: any) {
    throw new Error(error.message)
  }
}