import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { defaultTheme } from "../../configs/default-theme";
import { Avatar } from "react-native-elements";
import ExerciseImg from "../../../assets/biceps.png"
import Feather from '@expo/vector-icons/Feather';
import { useContextRoutine } from "../../hooks/useContextRoutine";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TypeAppRoutes } from "../../routes/app.routes";
import { apiDeleteExerciseFromRoutine } from "../../api/delete-exercise-from-routine";

type ParamsExerciseCard = {
  exercise_id_in_exercises : number,
  id: string;
  name: string;
  group: string;
  img : string
  gif: string;
  description: string;
}

type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>

export function ExerciseUpdateRoutineCard({ exercise_id_in_exercises, id, name, group, img ,gif, description }: ParamsExerciseCard) {
  const { setRoutines, routines, routineSelected, setRoutineSelected, setExercisesRemoved } = useContextRoutine();
  const { navigate } = useNavigation<TypeNavigation>()

  async function handleRemoveExerciseSelected() {
    await apiDeleteExerciseFromRoutine(Number(id));
    /* setExercisesRemoved(prev => [...prev, Number(id)]); */
    const routinesUpdated = routines.map(r => {
      if(r.id != routineSelected!.id) return r
      return {
        ...r,
        exercises : r.exercises.filter(e => e.id != id)
      }
    })
    setRoutines(routinesUpdated)
    setRoutineSelected(prev => {
      return {
        id: prev.id ?? null,
        name: prev.name ?? null,
        exercises: prev.exercises.filter(e => e.id !== id)
      }
    });
  };

  function handleNavigateDetails() {
    navigate("exercise-details", {
      item: {
        id: String(id),
        name,
        group,
        gif,
        description
      },
      fromRoute: "update-routine"
    })
  }

  return (
    <TouchableOpacity onPress={handleNavigateDetails}>
      <View style={styles.container}>
        <Avatar
           source={{ uri: `https://drive.google.com/uc?export=view&id=${img}` }}
          size={64}
          avatarStyle={{ borderRadius: 10 }}
        />
        <View style={styles.containerExerciseInfo}>
          <Text style={styles.primaryText} numberOfLines={1}>{name}</Text>
          <Text style={styles.secondaryText}>{group}</Text>
        </View>

        <TouchableOpacity onPress={handleRemoveExerciseSelected}>
          <Feather name="trash" size={28} color={defaultTheme.colors.defaultRed} />
        </TouchableOpacity>
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