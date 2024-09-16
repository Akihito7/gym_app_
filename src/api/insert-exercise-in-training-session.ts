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
    throw new Error(error.message)
  }
}