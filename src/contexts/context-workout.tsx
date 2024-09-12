import { createContext, useState } from "react";

type TypeContextWorkout = {
    workoutSession: TypeWorkoutSession,
    setWorkoutSession: React.Dispatch<React.SetStateAction<TypeWorkoutSession>>
}
export const ContextWorkout = createContext({} as TypeContextWorkout);

type TypeContextWorkoutProvider = {
    children: React.ReactNode
}

export type TypeWorkoutSession = {
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

export function ContextWorkoutProvider({ children }: TypeContextWorkoutProvider) {
    const [workoutSession, setWorkoutSession] = useState<TypeWorkoutSession>({} as TypeWorkoutSession)
    return (
        <ContextWorkout.Provider value={{
            workoutSession,
            setWorkoutSession
        }}>
            {children}
        </ContextWorkout.Provider>
    )
}