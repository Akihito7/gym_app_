import React from "react";
import { NativeBaseProvider } from "native-base";
import { Home } from "./src/screens/home";
import { theme } from "./src/theme/custom-theme-native-base";
import { ExerciseLibrary } from "./src/screens/exercise-library";
import { ExerciseDetails } from "./src/screens/exercise-details";
import { CardExerciseRoutine } from "./src/components/card-exercise-routine";
import { CreateRoutine } from "./src/screens/create-routine";
import { WorkoutTracker } from "./src/screens/workout-tracker";
import { Profile } from "./src/screens/profile";
import { Singln } from "./src/screens/signln";
import { Signup } from "./src/screens/signup";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Signup />
    </NativeBaseProvider>
  );
}