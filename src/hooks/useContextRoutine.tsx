import { useContext } from "react";
import { ContextRoutine } from "../contexts/context-routine";

export function useContextRoutine(){
  return useContext(ContextRoutine)
}