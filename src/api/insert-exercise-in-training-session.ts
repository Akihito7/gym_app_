import { api } from "../services/axios";

type ParamsApiInsertExerciseInTraningSession = {
  workoutId: number;
  exerciseId: number;
  order: number;
}
export async function apiInsertExerciseInTrainingSession({ workoutId, exerciseId, order }: ParamsApiInsertExerciseInTraningSession) {
  try {
    const response = await api.post("/training-sessions/exercise", {
      workoutId, exerciseId, order
    })
    return response.data[0]
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("INTERNAL ERROR SERVER");
  }
}