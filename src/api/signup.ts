import { api } from "../services/axios";

type ParamsSignup = {
  email : string;
  password : string;
}
export async function signup({ email, password } : ParamsSignup) {
  const response = await api.post("/auth/signup", {email,password});
  console.log(response)
}