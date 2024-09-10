import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { ExerciseCard } from "../components/exercise-catalog/exercise-card";
import { defaultTheme } from "../configs/default-theme";

const exercises = [
  {
    "id": 1,
    "name": "Supino Reto",
    "group": "Peito"
  },
  {
    "id": 2,
    "name": "Agachamento",
    "group": "Pernas"
  },
  {
    "id": 3,
    "name": "Puxada na Barra Fixa",
    "group": "Costas"
  },
  {
    "id": 4,
    "name": "Rosca Direta",
    "group": "Bíceps"
  }
];

export function ExerciseCatalogScreen() {
  return (
    <View style={styles.container}>
      <Header title="Escolher exercicios" />
      <View style={styles.main}>
        <Input />
        <FlatList
          data={exercises}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ExerciseCard
              key={item.id}
              id={item.id}
              name={item.name}
              group={item.group}
            />)}
          ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 18,
            marginTop: 24,
          }}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
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
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: defaultTheme.colors.button,
    height: 52,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "semibold",
    color: defaultTheme.colors.primaryText,
  }
})