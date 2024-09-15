import { api } from "../services/axios";

export async function apiGetHistoryTrainingSessions(userId : number){
  try {
    const response = await api.get(`/training-sessions/${userId}`)
    return response.data
  } catch (error : any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("INTERNAL ERROR SERVER");
  }
}