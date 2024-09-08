import { createContext, useCallback, useContext, useState } from "react";
import { api } from "../services/axios";
import { UserDTO } from "../dtos/user";
type ParamsSignln = {
  email: string;
  password: string;
}

type TypeUserContext = {
  signln: ({ email, password }: ParamsSignln) => void;
  user : UserDTO;
}
const UserContext = createContext({} as TypeUserContext)

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({} as UserDTO);
  async function signln({ email, password }: ParamsSignln) {
    try {
      const response = await api.post("auth/signln", { email, password });
      const { token } = response.data;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const user = await getUserInfo();
      setUser(user);
    } catch (error) {
      console.log(error)
    }
  };

  async function getUserInfo() {
    const response = await api.get("user");
    return response.data as UserDTO
  }
  return (
    <UserContext.Provider value={{
      signln,
      user
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext);
}