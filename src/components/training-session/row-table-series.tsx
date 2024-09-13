import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { defaultTheme } from "../../configs/default-theme";
import { useState } from "react";
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
  const [isFinished, setIsFinished] = useState(false);
  const [reps, setReps] = useState(repsInital);
  const [kgs, setKgs] = useState(kgsInital);
  const [editMode, setEditMode] = useState(false);

  const { workoutSession, setWorkoutSession } = useContextWorkout();

  function handleUpdateSeries() {
    if (!editMode) return setEditMode(true)
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
      setEditMode(false)
    } else {
      console.error("Exercise not found with id:", exerciseId);
    }
  }

  return (
    <TouchableOpacity onLongPress={() => setIsFinished(prev => !prev)}>
      <View style={{ ...styles.container, backgroundColor: isFinished ? defaultTheme.colors.backgroundComponents : "transparent" }}>
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
          readOnly={editMode ? false : true}
        />
        <TextInput
          style={styles.primaryText}
          keyboardType="number-pad"
          maxLength={3}
          value={String(kgs)}
          onChangeText={(e) => setKgs(Number(e))}
          readOnly={editMode ? false : true}
        />
        <TouchableOpacity onPress={handleUpdateSeries}>
          {
            editMode ?
              <FontAwesome5
                name="save"
                size={24}
                color={defaultTheme.colors.secondaryText}
              />
              :
              <Feather
                name="edit"
                size={24}
                color={defaultTheme.colors.secondaryText}
              />

          }

        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  primaryText: {
    width: "30%",
    fontSize: 16,
    color: defaultTheme.colors.primaryText
  }
})