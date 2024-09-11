import { createContext, useState } from "react";

type ParamsContextRoutineProvider = {
  children: React.ReactNode
};

type TypeRoutineSelected = {
  id: number;
  name: string;
  exercises: {
    id: string;
    name: string;
    group: string;
  }[]
}

type TypeContextRoutine = {
  routineSelected: TypeRoutineSelected | undefined
  setRoutineSelected: React.Dispatch<TypeRoutineSelected>
}

const ContextRoutine = createContext({} as TypeContextRoutine);

export function ContextRoutineProvider({ children }: ParamsContextRoutineProvider) {
  const [routineSelected, setRoutineSelected] = useState<TypeRoutineSelected>();
  return (
    <ContextRoutine.Provider value={{
      routineSelected,
      setRoutineSelected
    }}>
      {children}
    </ContextRoutine.Provider>
  )
}