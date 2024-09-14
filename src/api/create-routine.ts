import { api } from "../services/axios";

type ParamsApiCreateRoutine = {
  routineName: string;
}

export async function apiCreateRoutine({ routineName }: ParamsApiCreateRoutine) {
  try {
    const response = await api.post("/routines", { routineName });
    return response.data[0].id
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("INTERNAL ERROR SERVER");
  }

}