import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home-screen";
import { ExerciseCatalogScreen } from "../screens/exercise-catalog-screen";
import { CreateRoutineScreen } from "../screens/create-routine-screen";
import { defaultTheme } from "../configs/default-theme";
import { Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ExerciseDetailsScreen } from "../screens/exercise-details-screen";

export type TypeAppRoutes = {
  "home": undefined;
  "exercise-catalog": undefined;
  "create-routine": undefined;
  "exercise-details":
  {
    item: {
      id: string;
      name: string;
      group: string;
      gif: string;
      description: string;
    },
    fromRoute : string
  }
}
const { Navigator, Screen } = createBottomTabNavigator<TypeAppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: defaultTheme.colors.iconActiveTintColor,
      tabBarInactiveTintColor: defaultTheme.colors.iconInactiveTintColor,
      tabBarStyle: {
        backgroundColor: defaultTheme.colors.backgroundComponents,
        height: Platform.OS === 'android' ? 72 : 96,
        borderTopWidth: 0,
      }
    }}>
      <Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={32} color={color} />
          )
        }}
      />
      <Screen
        name="exercise-catalog"
        component={ExerciseCatalogScreen}
        options={{
          tabBarButton: () => null
        }}
      />
      <Screen
        name="create-routine"
        component={CreateRoutineScreen}
        options={{
          tabBarButton: () => null
        }}
      />

      <Screen
        name="exercise-details"
        component={ExerciseDetailsScreen}
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  )
}