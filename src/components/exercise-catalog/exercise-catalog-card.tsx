import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { defaultTheme } from "../../configs/default-theme";
import { Avatar } from "react-native-elements";
import { CheckBox } from "react-native-elements";
import { useEffect, useState } from "react";
import { useContextRoutine } from "../../hooks/useContextRoutine";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TypeAppRoutes } from "../../routes/app.routes";
import { apiInsertExerciseInRoutine } from "../../api/insert-exercise-in-routine";
import { useContextWorkout } from "../../hooks/useContextWorkout";

type ParamsExerciseCard = {
  fromRoute: string;
  id: number;
  name: string;
  group: string;
  img: string;
  gif: string;
  description: string;
}

type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>

export function ExerciseCatalogCard({ fromRoute, id, name, group, img, gif, description }: ParamsExerciseCard) {

  const { routineSelected, setRoutineSelected } = useContextRoutine();

  const [checked, setChecked] = useState(checkedInitialState(id));
  const { navigate } = useNavigation<TypeNavigation>();
  const { setWorkoutSession, workoutSession } = useContextWorkout()

  function checkedInitialState(id: number) {
    const alreadySelected = routineSelected?.exercises.some(item => String(item.exercise_id_in_exercises) === String(id));
    if (alreadySelected) {
      return true
    }
    else {
      return false
    }
  };

  /* from route, depois verificar  onde vamos adicionar o exercicio, basicamente e isso o fluxo */

  function CheckedExerciseRemovedFromRoutine() {
    const removed = routineSelected!.exercises.filter(item => item.id === String(id))
    if (removed!.length > 0) return;
    else setChecked(false)
  };

  async function handleAddExerciseInRoutine() {
    /* if(fromRoute === "training-session") add exercise in session training 
    else keep same thing
    */

    if (fromRoute === "training-session") {
      const alereaydIncludesInWorkout = workoutSession.exercises.filter(e => String(e.exercise_id_in_exercises) === String(id))
      if (alereaydIncludesInWorkout.length > 0) return;
      const exerciseWorkout = {
        img_url: img,
        exercise_id_in_exercises: id,
        id: String(id),
        name,
        group,
        gif,
        description,
        series: []
      }
      setWorkoutSession(prev => {
        return {
          ...prev,
          exercises: [...prev.exercises, exerciseWorkout]
        }
      })
    }

    if (fromRoute != "training-session") {
      if (routineSelected?.id) {
        await apiInsertExerciseInRoutine({
          routineId: routineSelected.id,
          exerciseId: id,
          order: 9999
        });
      }
      const exercise = {
        "exercise_id_in_exercises": id,
        id: String(id),
        name,
        group,
        img_url: img,
        gif,
        description,
        series: []
      }
      const alreadyIncludes = routineSelected!.exercises.filter(item => item.id === exercise.id);
      if (alreadyIncludes!.length <= 0) {
        setChecked(prev => !prev)
        setRoutineSelected(prev => {
          return {
            id: routineSelected?.id ?? null,
            name: routineSelected?.name ?? null,
            exercises: [...prev?.exercises, exercise]
          }
        })
      }
      if (alreadyIncludes.length > 0) {
        setChecked(prev => !prev)
        setRoutineSelected(prev => {
          return {
            id: null,
            name: null,
            exercises: prev?.exercises.filter(item => item.id !== exercise.id)
          }
        })
      }
    }
  }
  /* function  handleAddExerciseInTrainingSession */

  function handleNavigateDetails() {
    navigate("exercise-details", {
      item: {
        id: String(id),
        name,
        group,
        gif,
        description
      },
      fromRoute: "exercise-catalog"
    })
  }

  useEffect(() => {
    CheckedExerciseRemovedFromRoutine()
  }, [routineSelected?.exercises])

  useEffect(() => {
    setChecked(checkedInitialState(id));
  }, [routineSelected?.exercises]);

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

        <CheckBox size={28} checked={checked} onPress={handleAddExerciseInRoutine} />
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