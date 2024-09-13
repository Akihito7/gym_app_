import { createStackNavigator } from "@react-navigation/stack"
import { SignlnScreen } from "../screens/signln-screen";
import { SignupScreen } from "../screens/signup-screen";

const { Navigator, Screen } = createStackNavigator();
export type TypeAuthRoutes = {
  signln : undefined;
  signup : undefined;
}
export function AuthRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
    }}>
      <Screen
        name="signln"
        component={SignlnScreen}
      />

      <Screen
        name="signup"
        component={SignupScreen}
      />
    </Navigator>
  )
}