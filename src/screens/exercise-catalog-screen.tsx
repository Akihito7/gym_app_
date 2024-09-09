import { StyleSheet, View } from "react-native";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { ExerciseCard } from "../components/exercise-catalog/exercise-card";


export function ExerciseCatalogScreen() {
  return (
    <View style={styles.container}>
      <Header title="Escolher exercicios" />

      <View style={styles.main}>
        <Input />

        <ExerciseCard />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 64,
    paddingTop: 24,
  }
})