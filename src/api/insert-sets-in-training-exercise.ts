import { api } from "../services/axios";

type ParamsInsertSetsInTrainingExercise = {
  workoutExerciseId: number;
  reps: number;
  weight: number;
  order: number
}
export async function apiInsertSetsInTrainingExercise({ workoutExerciseId, reps, weight, order }: ParamsInsertSetsInTrainingExercise) {
  try {
    const response = await api.post("/training-sessions/exercise/series", {
      workoutExerciseId, reps, weight, order
    })
    return response.data
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("INTERNAL ERROR SERVER");
  }
}