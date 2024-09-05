import React from "react";
import { NativeBaseProvider } from "native-base";
import { Home } from "./src/screens/home";
import { theme } from "./src/theme/custom-theme-native-base";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Home />
    </NativeBaseProvider>
  );
}