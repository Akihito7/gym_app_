import React from "react";
import { NativeBaseProvider } from "native-base";
import { Home } from "./src/screens/home";
import { theme } from "./src/theme/custom-theme-native-base";
import { ExerciseLibrary } from "./src/screens/exercise-library";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <ExerciseLibrary />
    </NativeBaseProvider>
  );
}