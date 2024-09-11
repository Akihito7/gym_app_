import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { ExerciseCatalogCard } from "../components/exercise-catalog/exercise-catalog-card";
import { defaultTheme } from "../configs/default-theme";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TypeAppRoutes } from "../routes/app.routes";
import { FontAwesome } from "@expo/vector-icons";

type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>

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

  const { navigate } = useNavigation<TypeNavigation>();

  function handleNavigateToCreateRoutine() {
    navigate("create-routine");
  };

  return (
    <View style={styles.container}>
      <Header title="Escolher exercicios" />
      <View style={styles.main}>
        <Input>
          <FontAwesome
            name="search"
            size={24}
            color={defaultTheme.colors.primaryText}
          />
        </Input>
        <FlatList
          data={exercises}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ExerciseCatalogCard
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
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToCreateRoutine}
        >
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