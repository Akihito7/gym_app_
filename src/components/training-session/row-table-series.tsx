import { View, Text, StyleSheet, Touchable, TouchableOpacity, TextInput } from "react-native";
import { defaultTheme } from "../../configs/default-theme";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useContextWorkout } from "../../hooks/useContextWorkout";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type ParamsRowTableSeries = {
  exerciseId: number;
  id: number;
  order: number;
  repsInital: number;
  kgsInital: number;
}

export function RowTableSeries({ exerciseId, id, order, repsInital, kgsInital }: ParamsRowTableSeries) {
  const [editMode, setEditMode] = useState(false);
  const [reps, setReps] = useState(repsInital);
  const [kgs, setKgs] = useState(kgsInital);

  const { workoutSession, setWorkoutSession } = useContextWorkout();

  function handleUpdateSeries() {
    const exercise = workoutSession.exercises.find(e => e.id === String(exerciseId));
    if (exercise) {
      const updatedSeries = exercise.series.map(serie =>
        serie.id === id ? { ...serie, kg: kgs, reps: reps } : serie
      );
      const updatedExercise = {
        ...exercise,
        series: updatedSeries
      };
      const updatedExercises = workoutSession.exercises.map(ex =>
        ex.id === String(exerciseId) ? updatedExercise : ex
      );
      const updateWorkout = {
        ...workoutSession,
        exercises: updatedExercises
      };
      setWorkoutSession(updateWorkout);
    } else {
      console.error("Exercise not found with id:", exerciseId);
    }
  }

  useEffect(() => {
    console.log("as series mudaram =>", workoutSession.exercises[0].series)
  }, [workoutSession])
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.primaryText}
        keyboardType="number-pad"
        maxLength={3}
        readOnly={true}
        value={String(order)}
      />
      <TextInput
        style={styles.primaryText}
        keyboardType="number-pad"
        maxLength={3}
        value={String(reps)}
        onChangeText={(e) => setReps(Number(e))}
      />
      <TextInput
        style={styles.primaryText}
        keyboardType="number-pad"
        maxLength={3}
        value={String(kgs)}
        onChangeText={(e) => setKgs(Number(e))}
      />
      <TouchableOpacity onPress={handleUpdateSeries}>
        <FontAwesome5 name="save" size={24} color={defaultTheme.colors.primaryText} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  primaryText: {
    width: "30%",
    fontSize: 16,
    color: defaultTheme.colors.primaryText
  }
})