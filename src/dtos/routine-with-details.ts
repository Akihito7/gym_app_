import { Exercises } from "./exercises";

export type RoutineWithDetailsDTO = {
  name : string
  description : string;
  exercises : Exercises[],
}
