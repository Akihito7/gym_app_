import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useUserContext } from "../contexts/user-context";

export function Routes() {
  const { user } = useUserContext()
  return (
      <NavigationContainer >
         {user.username ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
  )
}