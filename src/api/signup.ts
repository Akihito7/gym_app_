import { api } from "../services/axios";

type ParamsSignup = {
  username: string;
  email: string;
  password: string;
}
export async function apiSignup({ username, email, password }: ParamsSignup) {
  try {
    const result = await api.post("/auth/signup", { username, email, password });
    return result.data;
  } catch (error: any) {
    throw new Error(error.message)
  }
}