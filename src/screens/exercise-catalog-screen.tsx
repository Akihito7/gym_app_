import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { ExerciseCatalogCard } from "../components/exercise-catalog/exercise-catalog-card";
import { defaultTheme } from "../configs/default-theme";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TypeAppRoutes } from "../routes/app.routes";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { apiGetManyExercises } from "../api/get-many-exercises";
import { ExerciseDTO } from "../dtos/exercise-DTO";
import { useContextRoutine } from "../hooks/useContextRoutine";


/* 
vou precisar receber um parametro na rota, sobre de qual rota veio pra essa, e dps passar iss para meus cards
e com base nisso eu sei onde devo adicionar o exercicio, se e em uma rotina ou uma sessao e sei tbm para qual rota devo navegar depois
*/
type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>
type ExerciseCatalogProp = RouteProp<TypeAppRoutes, 'exercise-catalog'>;


export function ExerciseCatalogScreen() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const { navigate } = useNavigation<TypeNavigation>();
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const { routineSelected } = useContextRoutine()
  const { params } = useRoute<ExerciseCatalogProp>()
  const fromRoute = params.fromRoute;
  
  function handleNavigateBack() {
    if (fromRoute === "training-session") navigate("training-session", { routineId: Number(routineSelected!.id) ?? 0, haveWorkoutSession : false });
    if (fromRoute === "create-routine") navigate("create-routine")
    if(fromRoute === "update-routine")  navigate("update-routine")
  };

  function handleInputValue(value: string) {
    setSearchInputValue(value)
  }

  useEffect(() => {
    async function getManyExercises() {
      const response = await apiGetManyExercises();
      setExercises(response)
    }
    getManyExercises();
  }, [])

  return (
    <View style={styles.container}>
      <Header title="Escolher exercicios" />
      <View style={styles.main}>
        <Input
          placeholder="Busque pelo nome"
          onChangeText={handleInputValue}
        >
          <FontAwesome
            name="search"
            size={24}
            color={defaultTheme.colors.primaryText}
          />
        </Input>
  {
    exercises &&        <FlatList
    data={
      searchInputValue
        ? exercises?.filter(item => item.name.toLowerCase().includes(searchInputValue.toLowerCase()))
        : exercises
    }
    keyExtractor={item => String(item.id)}
    renderItem={({ item }) => (
      <ExerciseCatalogCard
        fromRoute={fromRoute}
        key={item.id}
        id={item.id}
        name={item.name}
        img={item.img_url}
        group={item.muscle_group}
        gif={item.gif_url}
        description={item.description}
      />)}
    ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
    showsVerticalScrollIndicator={false}
    style={{
      marginBottom: 18,
      marginTop: 24,
    }}
  />
  }
 
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateBack}
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