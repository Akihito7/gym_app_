import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultTheme } from "../configs/default-theme";
import { Header } from "../components/header";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TypeAppRoutes } from "../routes/app.routes";

type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>
type ExerciseDetailsRouteProp = RouteProp<TypeAppRoutes, 'exercise-details'>;

export function ExerciseDetailsScreen() {
  const route = useRoute<ExerciseDetailsRouteProp>();
  const { item, fromRoute } = route.params;

  const { navigate } = useNavigation<TypeNavigation>();

  function handleNavigateBack() {
    if (fromRoute === 'exercise-catalog') navigate("exercise-catalog");
    if (fromRoute === 'view-routine') navigate("view-routine");
    if(fromRoute === 'update-routine') navigate('update-routine');
    if(fromRoute === 'create-routine') navigate('create-routine')
  }

  return (
    <View style={styles.container}>
      <Header title="Detalhes" />
      <ScrollView>
        <Image
          source={{ uri: `https://drive.google.com/uc?export=view&id=${item.gif}` }}
          style={{
            width: "100%",
            height: 400,
            objectFit: "contain"
          }}
        />

        <View style={styles.containerHowToDo}>
          <Text style={styles.primaryText}>{item.name}</Text>
          <Text style={styles.secondaryText}>
            {item.description}
          </Text>

          <TouchableOpacity
            style={styles.buttonUnderstood}
            onPress={handleNavigateBack}
          >
            <Text style={styles.buttonText}>Entendi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: defaultTheme.colors.backgroundScreen
  },
  containerHowToDo: {
    paddingHorizontal: 16,
    gap: 8,
  },
  primaryText: {
    fontSize: 20,
    color: defaultTheme.colors.primaryText,
    fontWeight: "bold",
  },
  secondaryText: {
    fontSize: 16,
    color: defaultTheme.colors.secondaryText,
    fontWeight: "semibold",
  },
  buttonUnderstood: {
    marginTop: 20,
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