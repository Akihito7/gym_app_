import { useContext } from "react";
import { ContextWorkout } from "../contexts/context-workout";

export function useContextWorkout() {
    return useContext(ContextWorkout)
}