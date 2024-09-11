import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Header } from "../components/home/header";
import { defaultTheme } from "../configs/default-theme";
import { RoutineCard } from "../components/home/routine-card";
import { Input } from "../components/home/input";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { TypeAppRoutes } from "../routes/app.routes";
import { useContextRoutine } from "../hooks/useContextRoutine";

type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>

/* const routines = [1, 2, 3, 4, 5, 6, 7]; */

export function HomeScreen() {
  const { navigate } = useNavigation<TypeNavigation>();
  const { setRoutineSelected } = useContextRoutine();
  const { routines } = useContextRoutine()

  function handleNavagiteToCreateRoutineAndSetRoutineContext() {
    setRoutineSelected({
      id: null,
      name: null,
      exercises: []
    });
    navigate("create-routine");
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.main}>
        <Input />
        <View style={styles.containerHeaderRoutines}>
          <Text style={styles.primaryText}>Minhas rotinas</Text>
          <Text style={styles.secondaryText}>( {routines.length} )</Text>
        </View>
        <FlatList
          data={routines}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => <RoutineCard key={item.id} name={item.name ?? ""} exercisesLength={item.exercises.length ?? 0} />}
          ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 18,
          }}
        />
        <TouchableOpacity
          style={styles.buttonCreateRoutine}
          onPress={handleNavagiteToCreateRoutineAndSetRoutineContext}
        >
          <Text style={styles.buttonText}>Criar nova rotina</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: defaultTheme.colors.backgroundScreen
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 14,
    paddingTop: 24,
  },
  containerHeaderRoutines: {
    flexDirection: "row",
    marginTop: 26,
    marginBottom: 16,
    alignItems: "center"
  },
  primaryText: {
    flex: 1,
    fontSize: 20,
    color: defaultTheme.colors.primaryText,
    fontWeight: "bold",
  },
  secondaryText: {
    fontSize: 16,
    color: defaultTheme.colors.secondaryText,
    fontWeight: "semibold",
  },
  buttonCreateRoutine: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: defaultTheme.colors.backgroundComponents,
    borderWidth: 2,
    height: 52,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "semibold",
    color: defaultTheme.colors.primaryText,
  }
})