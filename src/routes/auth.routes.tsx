import { createStackNavigator } from "@react-navigation/stack";
import { Singln } from "../screens/signln";
import { Signup } from "../screens/signup";

export type AuthRoutesType = {
  signln : undefined;
  signup : undefined
}
const { Navigator, Screen } = createStackNavigator<AuthRoutesType>();
export function AuthRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen name="signln" component={Singln} />
      <Screen name="signup" component={Signup} />
    </Navigator>
  )
}