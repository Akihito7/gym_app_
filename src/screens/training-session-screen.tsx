import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { defaultTheme } from "../configs/default-theme";
import { Header } from "../components/header";
import { Timer } from "../components/training-session/timer";
import { ExerciseTrainingCard } from "../components/training-session/exercise-training-card";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { TypeAppRoutes } from "../routes/app.routes";
import { useContextRoutine } from "../hooks/useContextRoutine";
import { useEffect, useState } from "react";
import { useContextWorkout } from "../hooks/useContextWorkout";
import { FlatList } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HeaderTrainingSession } from "../components/history-training-session/header-training-session";
import { useContextUser } from "../hooks/useContextUser";
import { apiCreateSessionTraining } from "../api/create-session-training";
import { apiInsertExerciseInTrainingSession } from "../api/insert-exercise-in-training-session";
import { apiInsertSetsInTrainingExercise } from "../api/insert-sets-in-training-exercise";


type TrainingSessionScreen = RouteProp<TypeAppRoutes, 'training-session'>;
type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>

export function TrainingSessionScreen() {
  const route = useRoute<TrainingSessionScreen>();
  const routineId = route.params.routineId;
  const { user } = useContextUser()
  const { routines } = useContextRoutine();
  const { workoutSession, setWorkoutSession } = useContextWorkout();
  const { navigate } = useNavigation<TypeNavigation>();
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });

  function setWorkoutFromRoutine() {
    const workout = routines.find(item => item.id === routineId);
    if (workout != undefined) {
      setWorkoutSession(workout);
    }
  };

  function handleNavigateExerciseCatalog() {
    navigate("exercise-catalog")
  }

  async function handleSaveTrainingSession() {
    const durationFormatted = `${String(timer.minutes).padStart(2, "0")}:${String(timer.seconds).padStart(2, "0")}`
    const response = await apiCreateSessionTraining({
      userId: user.id,
      routineId,
      duration: durationFormatted
    })

    const setsPromisses = workoutSession.exercises.map(async (exercise) => {
      if(exercise.series.length <= 0) return;
      const exerciseResponse = await apiInsertExerciseInTrainingSession({
        exerciseId: exercise.exercise_id_in_exercises,
        workoutId: response.id,
        order: 1
      });

      return exercise.series.map((s) => {
        return apiInsertSetsInTrainingExercise({
          workoutExerciseId: exerciseResponse.id,
          reps: s.reps,
          order: s.order,
          weight: s.kg
        })
      })

    })
  };

  useEffect(() => {
    setWorkoutFromRoutine();
  }, [routineId])
  
  return (
    <View style={styles.container}>
      <HeaderTrainingSession
        handleSaveTrainingSession={handleSaveTrainingSession}
      />
      <ScrollView>
        <View style={styles.main}>
          <Timer
            timer={timer}
            setTimer={setTimer}
          />
          <View style={styles.containerExerciseTrainingCard}>
            <FlatList
              data={workoutSession.exercises}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <ExerciseTrainingCard
                  exercise_id_in_exercises={item.exercise_id_in_exercises}
                  gif={item.gif}
                  exerciseId={Number(item.id)}
                  group={item.group}
                  exerciseName={item.name}
                  series={item.series}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
              showsVerticalScrollIndicator={false}
              style={{
                paddingBottom: 12,
              }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleNavigateExerciseCatalog}
            >
              <Text style={styles.buttonText}>Adicionar exercicio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.colors.backgroundScreen
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 14,
    paddingTop: 24,
  },
  containerExerciseTrainingCard: {
    marginTop: 16,
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: defaultTheme.colors.backgroundComponents,
    borderWidth: 2,
    height: 52,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "semibold",
    color: defaultTheme.colors.primaryText,
  }
})