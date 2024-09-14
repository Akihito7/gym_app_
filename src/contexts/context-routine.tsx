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
    series: {
      id: number,
      order: number,
      kg: number,
      reps: number,
    }[]
  }[]
}

type TypeContextRoutine = {
  routineSelected: TypeRoutineSelected | undefined
  setRoutineSelected: React.Dispatch<React.SetStateAction<TypeRoutineSelected>>
  routines: TypeRoutineSelected[];
  setRoutines: React.Dispatch<React.SetStateAction<TypeRoutineSelected[]>>
  routineUpdated: TypeRoutineSelected | undefined
  setRoutineUpdated: React.Dispatch<React.SetStateAction<TypeRoutineSelected>>
  getChanges : (value : TypeRoutineSelected, valueTwo : TypeRoutineSelected) => void;

}

export const ContextRoutine = createContext({} as TypeContextRoutine);

export function ContextRoutineProvider({ children }: ParamsContextRoutineProvider) {
  const [routineSelected, setRoutineSelected] = useState<TypeRoutineSelected>({} as TypeRoutineSelected);
  const [routineUpdated, setRoutineUpdated] = useState<TypeRoutineSelected>({} as TypeRoutineSelected);
  const [routines, setRoutines] = useState<TypeRoutineSelected[]>([]);

  function getChanges(originalRoutine: TypeRoutineSelected, modifiedRoutine: TypeRoutineSelected) {
    const originalIds = new Set(originalRoutine.exercises.map(e => e.id));
    const modifiedIds = new Set(modifiedRoutine.exercises.map(e => e.id));

    const added = originalRoutine.exercises.filter(e => !originalIds.has(e.id));
    const removed = modifiedRoutine.exercises.filter(e => !modifiedIds.has(e.id));

    return { added, removed };
  }
  return (
    <ContextRoutine.Provider value={{
      routineSelected,
      setRoutineSelected,
      routines,
      setRoutines,
      routineUpdated,
      setRoutineUpdated,
      getChanges
    }}>
      {children}
    </ContextRoutine.Provider>
  )
}