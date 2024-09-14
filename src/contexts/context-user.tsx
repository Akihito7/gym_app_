import { createContext, SetStateAction, useState } from "react";
import { UserDTO } from "../dtos/user-DTO";
import { apiSignup } from "../api/signup";
import { useContextMessage } from "../hooks/useContextMessage";


type TypeContextUser = {
  user: UserDTO,
  setUser: React.Dispatch<SetStateAction<UserDTO>>
  token: string,
  setToken: React.Dispatch<SetStateAction<string>>
  signup: ({ username, email, password }: ParamsSignup) => void;
}
export const ContextUser = createContext({} as TypeContextUser)

type TypeContextProvider = {
  children: React.ReactNode
}

type ParamsSignup = {
  username: string;
  email: string;
  password: string;
}
export function ContextUserProvider({ children }: TypeContextProvider) {
  const [user, setUser] = useState({} as UserDTO);
  const [token, setToken] = useState("");


  async function signup({ username, email, password }: ParamsSignup) {
     return apiSignup({ username, email, password });
  }

  return (
    <ContextUser.Provider value={{
      user,
      setUser,
      token,
      setToken,
      signup,
    }}>
      {children}
    </ContextUser.Provider>
  )
}