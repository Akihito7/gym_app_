import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { defaultTheme } from "../../configs/default-theme";
import { Avatar } from "react-native-elements";
import ExerciseImg from "../../../assets/biceps.png"
import { CheckBox } from "react-native-elements";
import { useEffect, useState } from "react";
import { useContextRoutine } from "../../hooks/useContextRoutine";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TypeAppRoutes } from "../../routes/app.routes";

type ParamsExerciseCard = {
  id: number;
  name: string;
  group: string;
  gif: string;
  description: string;
}

type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>

export function ExerciseCatalogCard({ id, name, group, gif, description }: ParamsExerciseCard) {

  const { routineSelected, setRoutineSelected } = useContextRoutine();
  const [checked, setChecked] = useState(checkedInitialState(id));
  const { navigate } = useNavigation<TypeNavigation>();

  function checkedInitialState(id: number) {
    const alreadySelected = routineSelected?.exercises.filter(item => item.id === String(id));
    if (alreadySelected!.length > 0) return true;
    else false
  };


  /* from route, depois verificar  onde vamos adicionar o exercicio, basicamente e isso o fluxo */

  function CheckedExerciseRemovedFromRoutine() {
    const removed = routineSelected!.exercises.filter(item => item.id === String(id))
    if (removed!.length > 0) return;
    else setChecked(false)
  };

  function handleAddExerciseInRoutine() {

    /* if(fromRoute === "training-session") add exercise in session training 
    else keep same thing
    */
    const exercise = {
      id: String(id),
      name,
      group,
      gif,
      description,
      series: []
    }

    const alreadyIncludes = routineSelected!.exercises.filter(item => item.id === exercise.id);

    if (alreadyIncludes!.length <= 0) {
      setChecked(prev => !prev)
      setRoutineSelected(prev => {
        return {
          id: null,
          name: null,
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