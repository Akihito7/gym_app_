import { useContext } from "react";
import { ContextUser } from "../contexts/context-user";

export function useContextUser(){
  return useContext(ContextUser);
}