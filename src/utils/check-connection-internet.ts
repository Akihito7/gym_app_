import axios from "axios";

const checkInternet = axios.create({
  baseURL: "https://www.google.com"
})


export function userIsConnected() {
  try {
    checkInternet.get("/")
    return true
  } catch (error) {
    return false
  }
}