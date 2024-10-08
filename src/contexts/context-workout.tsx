import { createContext, SetStateAction, useState } from "react";

type TypeContextWorkout = {
  workoutSession: TypeWorkoutSession,
  setWorkoutSession: React.Dispatch<React.SetStateAction<TypeWorkoutSession>>
  shouldGetWorkout: boolean,
  setShouldGetWorkout : React.Dispatch<SetStateAction<boolean>>
  timer : {minutes : number, seconds : number}
  setTimer : React.Dispatch<SetStateAction<{minutes : number, seconds : number}>>
}
export const ContextWorkout = createContext({} as TypeContextWorkout);

type TypeContextWorkoutProvider = {
  children: React.ReactNode
}

export type TypeWorkoutSession = {
  id: number | null;
  name: string | null;
  exercises: {
    img_url : string,
    exercise_id_in_exercises: number;
    id: string;
    name: string;
    group: string;
    gif: string;
    description: string;
    series: TypeSetsWokoutSession[]
  }[]
}

export type TypeSetsWokoutSession = {
  id: number,
  order: number,
  kg: number,
  reps: number,
}

export function ContextWorkoutProvider({ children }: TypeContextWorkoutProvider) {
  const [workoutSession, setWorkoutSession] = useState<TypeWorkoutSession>({} as TypeWorkoutSession);
  const [shouldGetWorkout, setShouldGetWorkout] = useState(false);
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  return (
    <ContextWorkout.Provider value={{
      workoutSession,
      setWorkoutSession,
      shouldGetWorkout,
      setShouldGetWorkout,
      timer,
      setTimer
    }}>
      {children}
    </ContextWorkout.Provider>
  )
}