import { api } from "../services/axios";

type ParamsApiSignln = {
  email: string;
  password: string
}
export async function apiSignln({ email, password }: ParamsApiSignln) {
  try {
    const response = await api.post("/auth/signln", { email, password });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error("INTERNAL ERROR SERVER");
  }
}