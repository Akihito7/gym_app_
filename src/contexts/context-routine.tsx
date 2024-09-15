import { createContext, useState } from "react";

type ParamsContextRoutineProvider = {
  children: React.ReactNode
};

export type TypeRoutineSelected = {
  id: number | null;
  name: string | null;
  exercises: Exercises[]
}

export type Exercises = {
 exercise_id_in_exercises : number,
  id: string;
  name: string;
  group: string;
  img_url : string;
  gif: string;
  description: string;
  series: {
    id: number,
    order: number,
    kg: number,
    reps: number,
  }[]
}


type TypeContextRoutine = {
  routineSelected: TypeRoutineSelected | undefined
  setRoutineSelected: React.Dispatch<React.SetStateAction<TypeRoutineSelected>>
  routines: TypeRoutineSelected[];
  setRoutines: React.Dispatch<React.SetStateAction<TypeRoutineSelected[]>>
  exercisesRemoved: number[],
  setExercisesRemoved: React.Dispatch<React.SetStateAction<number[]>>
}

export const ContextRoutine = createContext({} as TypeContextRoutine);

export function ContextRoutineProvider({ children }: ParamsContextRoutineProvider) {
  const [routineSelected, setRoutineSelected] = useState<TypeRoutineSelected>({} as TypeRoutineSelected);
  const [routines, setRoutines] = useState<TypeRoutineSelected[]>([]);
  const [exercisesRemoved, setExercisesRemoved] = useState<number[]>([])

  return (
    <ContextRoutine.Provider value={{
      routineSelected,
      setRoutineSelected,
      routines,
      setRoutines,
      exercisesRemoved,
      setExercisesRemoved,
    }}>
      {children}
    </ContextRoutine.Provider>
  )
}