import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { defaultTheme } from "../../configs/default-theme"
import { Avatar } from "react-native-elements"
import { Feather } from "@expo/vector-icons"
import { HeaderTableSeries } from "./header-table-series"
import { RowTableSeries } from "./row-table-series"
import { useContextWorkout } from "../../hooks/useContextWorkout"

type TypeExerciseTrainingCard = {
  exercise_id_in_exercises : number;
  exerciseId: number;
  exerciseName: string;
  group: string;
  img : string,
  gif: string;
  series: {
    id: number;
    order: number;
    reps: number;
    kg: number
  }[]
}
export function ExerciseTrainingCard({ exercise_id_in_exercises, exerciseId, exerciseName, group, img, gif, series }: TypeExerciseTrainingCard) {
  const { workoutSession, setWorkoutSession } = useContextWorkout();

  function handleAddNewSerieInExercise() {
    const exercise = workoutSession.exercises.find(e => String(e.exercise_id_in_exercises) === String(exercise_id_in_exercises));
      
    if (exercise) {
      const newSeries = {
        id: exercise.series.length + 1,
        kg: 0,
        order: exercise.series.length + 1,
        reps: 0
      };
      const updatedExercise = {
        ...exercise,
        series: [...exercise.series, newSeries]
      };

      const updatedExercises = workoutSession.exercises.map(exercise =>
        String(exercise.exercise_id_in_exercises) === String(exercise_id_in_exercises) ? updatedExercise : exercise
      );
      const updateWorkout = {
        ...workoutSession,
        exercises: updatedExercises
      };
      setWorkoutSession(updateWorkout);
    } else {
      console.error("Exercise not found with id:", exercise_id_in_exercises);
    }
  }

  function handleDeleteExerciseInWorkoutSession() {
    const updatedExercisesWorkout = workoutSession.exercises.filter(e => e.id != String(exerciseId));
    const workoutUpdated = {
      ...workoutSession,
      exercises: updatedExercisesWorkout
    }
    setWorkoutSession(workoutUpdated)
  }

  return (
      <View style={styles.container}>
        <View style={styles.containerExerciseInfo}>
          <Avatar
            source={{ uri: `https://drive.google.com/uc?export=view&id=${img}`}}
            size={64}
            avatarStyle={{ borderRadius: 10 }}
          />

          <View style={styles.containerTextExercise} >
            <Text style={styles.primaryText} numberOfLines={1}>{exerciseName}</Text>
            <Text style={styles.secondaryText}>{group}</Text>
          </View>

          <TouchableOpacity onPress={handleDeleteExerciseInWorkoutSession}>
            <Feather name="trash" size={28} color={defaultTheme.colors.defaultRed} />
          </TouchableOpacity>
        </View>

        <View style={styles.containerTable}>
          <>
            <HeaderTableSeries />
            {
              series.length > 0 && series.map(item => (
                <RowTableSeries
                  exerciseId={exercise_id_in_exercises}
                  id={item.id}
                  order={item.order}
                  kgsInital={item.kg}
                  repsInital={item.reps}
                />
              ))
            }
          </>

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddNewSerieInExercise}
        >
          <Text style={styles.buttonText}>Nova serie</Text>
        </TouchableOpacity>
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  containerExerciseInfo: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: defaultTheme.colors.backgroundComponents,
    borderRadius: 10,
    paddingRight: 12,
  },
  containerTextExercise: {
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
  },
  containerTable: {
    marginTop: 12,
  },
  button: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: defaultTheme.colors.backgroundComponents,
    height: 52,
    marginTop: 8,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    color: defaultTheme.colors.primaryText
  }
})