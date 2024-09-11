import { StyleSheet, View } from "react-native";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { ExerciseRoutineCard } from "../components/create-routine/exercise-routine-card";
import { ContextRoutineProvider } from "../contexts/context-routine";
import { defaultTheme } from "../configs/default-theme";


export function CreateRoutineScreen() {
  return (
      <View style={styles.container}>
        <Header title="Criar Rotina" />

        <View style={styles.main}>
          <Input />
          <ExerciseRoutineCard id={1} name="Biceps com barra w" group="Biceps" key={1} />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor :  defaultTheme.colors.backgroundScreen
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 14,
    paddingTop: 24,
  },
})
