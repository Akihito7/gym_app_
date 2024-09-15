import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultTheme } from "../configs/default-theme";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { FontAwesome } from "@expo/vector-icons";
import { useContextRoutine } from "../hooks/useContextRoutine";
import { ExerciseViewRoutineCard } from "../components/view-routine/exercise-view-routine-card";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TypeAppRoutes } from "../routes/app.routes";

type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>;

export function ViewRoutineScreen() {
  const { routineSelected } = useContextRoutine();
  const { navigate } = useNavigation<TypeNavigation>();

  function handleNavigateTrainingSession() {
    navigate("training-session", { routineId: routineSelected?.id ?? 0 });
  }

  return (
    <View style={styles.container}>
      <Header title={`Rotina ${routineSelected?.name}`} />

      <View style={styles.main}>
        <Input placeholder="Busque por um exercicio">
          <FontAwesome
            name="search"
            size={24}
            color={defaultTheme.colors.primaryText}
          />
        </Input>

        <FlatList
          data={routineSelected?.exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ExerciseViewRoutineCard
            key={item.id}
            id={item.id}
            name={item.name ?? ""}
            group={item.group}
            img={item.img_url}
            gif={item.gif}
            description={item.description}

          />}
          ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 18,
            marginTop: 24,
          }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateTrainingSession}
        >
          <Text style={styles.buttonText}>Iniciar Treino</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.colors.backgroundScreen
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 14,
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