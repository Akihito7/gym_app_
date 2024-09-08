import { createContext, useCallback, useContext } from "react";
import { api } from "../services/axios";
type ParamsSignln = {
  email: string;
  password: string;
}

type TypeUserContext = {
  signln: ({ email, password }: ParamsSignln) => void
}
const UserContext = createContext({} as TypeUserContext)

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  async function signln({ email, password }: ParamsSignln) {
    console.log(email,password)
    try {
      const response = await api.post("auth/signln", {email, password});
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <UserContext.Provider value={{
      signln
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext(){
  return useContext(UserContext);
}