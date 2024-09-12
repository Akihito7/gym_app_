import { StyleSheet, View } from "react-native";
import { defaultTheme } from "../configs/default-theme";
import { Header } from "../components/header";
import { Timer } from "../components/training-session/timer";
import { ExerciseTrainingCard } from "../components/training-session/exercise-training-card";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TypeAppRoutes } from "../routes/app.routes";
import { useContextRoutine } from "../hooks/useContextRoutine";
import { useEffect } from "react";
import { useContextWorkout } from "../hooks/useContextWorkout";
import { FlatList } from "react-native";


type TrainingSessionScreen = RouteProp<TypeAppRoutes, 'training-session'>;

export function TrainingSessionScreen() {
  const route = useRoute<TrainingSessionScreen>();
  const routineId = route.params.routineId;
  const { routines } = useContextRoutine();
  const { workoutSession, setWorkoutSession } = useContextWorkout()

  function setWorkoutFromRoutine() {
    const workout = routines.find(item => item.id === routineId);
    if (workout != undefined) setWorkoutSession(workout)
  };
  useEffect(() => {
    setWorkoutFromRoutine();
  }, [routineId])
  return (
    <View style={styles.container}>
      <Header title="Sessão atual" />
      <View style={styles.main}>
        <Timer />
        <View style={styles.containerExerciseTrainingCard}>
          <FlatList
            data={workoutSession.exercises}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <ExerciseTrainingCard
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
              marginBottom: 42,
              paddingBottom: 12,
            }}
          />

        </View>
      </View>
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
  }
})