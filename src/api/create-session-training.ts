import { api } from "../services/axios";

type TypeApiCreateSessionTraining = {
  userId: number;
  routineId: number;
  duration: string;
}

export async function apiCreateSessionTraining({ userId, routineId, duration }: TypeApiCreateSessionTraining) {
  try {
    const response = await api.post("training-sessions", {
      userId, routineId, duration
    })
    return response.data[0]
  } catch (error: any) {
    throw new Error(error.message)
  }
}