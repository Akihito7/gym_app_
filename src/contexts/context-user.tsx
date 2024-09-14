import { createContext, SetStateAction, useState } from "react";
import { UserDTO } from "../dtos/user-DTO";
import { apiSignup } from "../api/signup";
import { useContextMessage } from "../hooks/useContextMessage";
import { apiSignln } from "../api/signln";
import { api } from "../services/axios";


type TypeContextUser = {
  user: UserDTO,
  setUser: React.Dispatch<SetStateAction<UserDTO>>
  token: string,
  setToken: React.Dispatch<SetStateAction<string>>
  signup: ({ username, email, password }: ParamsSignup) => void;
  signln: ({ email, password }: ParamsSignln) => void;
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

type ParamsSignln = {
  email: string;
  password: string;
}
export function ContextUserProvider({ children }: TypeContextProvider) {
  const [user, setUser] = useState({} as UserDTO);
  const [token, setToken] = useState("");
  const { setMessage } = useContextMessage()


  async function signup({ username, email, password }: ParamsSignup) {
    return apiSignup({ username, email, password });
  }

  async function signln({ email, password }: ParamsSignln) {
    try {
      const response = await apiSignln({ email, password });
      const token = response.token;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setToken(token);
    } catch (error: any) {
      setMessage({
        message: error.message,
        type: "failure"
      })
    }
  }

  return (
    <ContextUser.Provider value={{
      user,
      setUser,
      token,
      setToken,
      signup,
      signln
    }}>
      {children}
    </ContextUser.Provider>
  )
}