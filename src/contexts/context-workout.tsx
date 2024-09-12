import { createContext } from "react";

type TypeContextWorkout = {}
export const ContextWorkout = createContext({} as TypeContextWorkout);

type TypeContextWorkoutProvider = {
    children : React.ReactNode
}
export function ContextWorkoutProvider({ children } : TypeContextWorkoutProvider){
    return (
        <ContextWorkout.Provider value={{}}>
            {children}
        </ContextWorkout.Provider>
    )
}