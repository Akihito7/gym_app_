import { api } from "../services/axios";

export async function apiGetHistoryTrainingSessions(userId : number){
  try {
    const response = await api.get(`/training-sessions/${userId}`)
    return response.data
  } catch (error : any) {
    throw new Error(error.message)
  }
}