import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { defaultTheme } from "../../configs/default-theme"
import { Avatar } from "react-native-elements"
import ExerciseImg from "../../../assets/biceps.png"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { TypeAppRoutes } from "../../routes/app.routes"


type ParamsExerciseViewRoutineCard = {
  id: string;
  name: string;
  group: string;
  gif: string;
  description: string
};

type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>

export function ExerciseViewRoutineCard({ id, name, group, gif, description }: ParamsExerciseViewRoutineCard) {
  const { navigate } = useNavigation<TypeNavigation>();

  function handleNavigateDetails() {
    navigate("exercise-details", {
      item: {
        id: String(id),
        name,
        group,
        gif,
        description
      },
      fromRoute: "view-routine"
    })
  }

  return (
    <TouchableOpacity onPress={handleNavigateDetails}>
      <View style={styles.container}>
        <Avatar
          source={ExerciseImg}
          size={64}
          avatarStyle={{ borderRadius: 10 }}
        />
        <View style={styles.containerExerciseInfo}>
          <Text style={styles.primaryText} numberOfLines={1}>{name}</Text>
          <Text style={styles.secondaryText}>{group}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: defaultTheme.colors.backgroundComponents,
    borderRadius: 10,
    paddingRight: 12,
  },
  containerExerciseInfo: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
    paddingRight: 20,
  },
  primaryText: {
    fontSize: 16,
    color: defaultTheme.colors.primaryText,
  },
  secondaryText: {
    fontSize: 14,
    color: defaultTheme.colors.secondaryText,
  }
})