import { api } from "../services/axios";


type ParamsApiInsertExerciseInRoutine = {
  routineId: number;
  exerciseId: number,
  order: number,
}
export async function apiInsertExerciseInRoutine({ routineId, exerciseId, order }: ParamsApiInsertExerciseInRoutine) {
  try {
    const response = await api.post("/routines/exercise", { routineId, exerciseId, order });
    return response.data
  } catch (error : any) {
    throw new Error(error.message)
  }
}