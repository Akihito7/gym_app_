import { createContext, useState } from "react";

type ParamsContextRoutineProvider = {
  children: React.ReactNode
};

export type TypeRoutineSelected = {
  id: number | null;
  name: string | null;
  exercises: {
    id: string;
    name: string;
    group: string;
    gif: string;
    description: string;
  }[]
}

type TypeContextRoutine = {
  routineSelected: TypeRoutineSelected | undefined
  setRoutineSelected: React.Dispatch<React.SetStateAction<TypeRoutineSelected>>
  routines: TypeRoutineSelected[];
  setRoutines: React.Dispatch<React.SetStateAction<TypeRoutineSelected[]>>
}

export const ContextRoutine = createContext({} as TypeContextRoutine);

export function ContextRoutineProvider({ children }: ParamsContextRoutineProvider) {
  const [routineSelected, setRoutineSelected] = useState<TypeRoutineSelected>({} as TypeRoutineSelected);
  const [routines, setRoutines] = useState<TypeRoutineSelected[]>([]);
  return (
    <ContextRoutine.Provider value={{
      routineSelected,
      setRoutineSelected,
      routines,
      setRoutines,
    }}>
      {children}
    </ContextRoutine.Provider>
  )
}