import { useContext } from "react";
import { ContextMessage } from "../contexts/context-message";

export function useContextMessage(){
  return useContext(ContextMessage)
}