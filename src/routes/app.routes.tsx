import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/home";
import { NavigationContainer } from "@react-navigation/native";
import { Profile } from "../screens/profile";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from "native-base";
import { Platform } from "react-native";
import { CreateRoutine } from "../screens/create-routine";
import { ExerciseDetails } from "../screens/exercise-details";
import { WorkoutTracker } from "../screens/workout-tracker";
import { ExerciseLibrary } from "../screens/exercise-library";

const { Navigator, Screen } = createBottomTabNavigator();


export function AppRoutes() {
  const { colors } = useTheme()
  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.primary[700],
      tabBarInactiveTintColor: colors.gray[400],
      tabBarStyle: {
        backgroundColor: colors.gray[700],
        borderTopWidth: 0,
      }

    }}>
      <Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color }) => (
          <Icon name="home" size={24} color={color} />
        )
      }} />
      <Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color }) => (
          <Icon name="user" size={24} color={color} />
        )
      }}
      />
      <Screen name="create-routine" component={CreateRoutine} options={{
        tabBarButton: () => null,
      }}
      />
      <Screen name="exercise-details" component={ExerciseDetails} options={{
        tabBarButton: () => null,
      }}
      />

      <Screen name="workout-tracker" component={WorkoutTracker} options={{
        tabBarButton: () => null,
      }}
      />

      <Screen name="exercise-library" component={ExerciseLibrary} options={{
        tabBarButton: () => null,
      }}
      />
    </Navigator>
  )
}