import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { ExerciseCatalogCard } from "../components/exercise-catalog/exercise-catalog-card";
import { defaultTheme } from "../configs/default-theme";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TypeAppRoutes } from "../routes/app.routes";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";

type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>

const exercises = [
  {
    "id": 1,
    "name": "Supino Reto",
    "image" : "",
    "group": "Peito",
    "gif": "https://media1.tenor.com/m/oaRRq3lgB-wAAAAd/barbellbenchpress-gymexercisesmen.gif",
    "description": "Deite-se no banco, pés no chão. Segure a barra com as mãos na largura dos ombros. Abaixe a barra até o peito e levante-a de volta. Trabalha peito e tríceps."
  },
  {
    "id": 2,
    "name": "Agachamento",
    "group": "Pernas",
    "gif": "https://media1.tenor.com/m/pdMmsiutWkcAAAAC/gym.gif",
    "description": "Fique em pé com os pés na largura dos ombros e a barra sobre os ombros. Agache até as coxas ficarem paralelas ao chão, e depois levante-se. Fortalece pernas e glúteos."
  },
  {
    "id": 3,
    "name": "Remada com Barra",
    "group": "Costas",
    "gif": "https://media1.tenor.com/m/AYJ_bNXDvoUAAAAC/workout-muscles.gif",
    "description": "Incline o tronco para frente, mantendo as costas retas. Segure a barra com as mãos na largura dos ombros. Puxe a barra em direção ao abdômen e retorne. Foca nas costas e bíceps."
  },
  {
    "id": 4,
    "name": "Rosca Direta",
    "group": "Bíceps",
    "gif": "https://media1.tenor.com/m/m2Dfyh507FQAAAAC/8preacher-curl.gif",
    "description": "Fique em pé com os pés na largura dos ombros. Segure a barra com as mãos na largura dos ombros. Dobre os cotovelos e levante a barra até a altura dos ombros. Trabalha os bíceps."
  }
];

export function ExerciseCatalogScreen() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const { navigate } = useNavigation<TypeNavigation>();

  function handleNavigateToCreateRoutine() {
    navigate("create-routine");
  };

  function handleInputValue(value: string) {
    setSearchInputValue(value)
  }

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
        
        <FlatList
          data={
            searchInputValue
              ? exercises.filter(item => item.name.toLowerCase().includes(searchInputValue.toLowerCase()))
              : exercises
          }
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ExerciseCatalogCard
              key={item.id}
              id={item.id}
              name={item.name}
              group={item.group}
              gif={item.gif}
              description={item.description}
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