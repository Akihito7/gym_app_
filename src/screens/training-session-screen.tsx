import { StyleSheet, Text, TouchableOpacity, View, ScrollView, AppState } from "react-native";
import { defaultTheme } from "../configs/default-theme";
import { Timer } from "../components/training-session/timer";
import { ExerciseTrainingCard } from "../components/training-session/exercise-training-card";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { TypeAppRoutes } from "../routes/app.routes";
import { useContextRoutine } from "../hooks/useContextRoutine";
import { useEffect, useState } from "react";
import { useContextWorkout } from "../hooks/useContextWorkout";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HeaderTrainingSession } from "../components/history-training-session/header-training-session";
import { useContextUser } from "../hooks/useContextUser";
import { apiCreateSessionTraining } from "../api/create-session-training";
import { apiInsertExerciseInTrainingSession } from "../api/insert-exercise-in-training-session";
import { apiInsertSetsInTrainingExercise } from "../api/insert-sets-in-training-exercise";
import { TypeWorkoutSession } from "../contexts/context-workout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypeRoutineSelected } from "../contexts/context-routine";
import { useIsFocused } from '@react-navigation/native';
import { userIsConnected } from "../utils/check-connection-internet";



type TrainingSessionScreen = RouteProp<TypeAppRoutes, 'training-session'>;
type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>

export function TrainingSessionScreen() {

  const route = useRoute<TrainingSessionScreen>();
  const routineId = route.params.routineId;
  const haveWorkoutSession = route.params.haveWorkoutSession;
  const { user } = useContextUser()
  const { routines } = useContextRoutine();
  const { workoutSession, setWorkoutSession, shouldGetWorkout, setTimer, timer } = useContextWorkout();
  const { setRoutineSelected, routineSelected } = useContextRoutine()
  const { navigate } = useNavigation<TypeNavigation>();
  const [step, setStep] = useState<1 | 2>(1);
  const [workedGroups, setWorkedGroups] = useState<string[]>([]);
  const [finished] = useState(false);

  function setWorkoutFromRoutine() {
    if (haveWorkoutSession) return;
    if (!shouldGetWorkout) return;
    const workout = routines.find(item => item.id === routineId);
    if (workout != undefined) {
      setWorkoutSession(workout);
    }
  };
  function handleNavigateExerciseCatalog() {
    navigate("exercise-catalog", { fromRoute: "training-session" })
  }

  async function handleSaveTrainingSession() {
    const durationFormatted = `${String(timer.minutes).padStart(2, "0")}:${String(timer.seconds).padStart(2, "0")}`
    const response = await apiCreateSessionTraining({
      userId: user.id,
      routineId,
      duration: durationFormatted
    })
    const setsPromisses = workoutSession.exercises.map(async (exercise) => {
      if (exercise.series.length <= 0) return;
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
    await AsyncStorage.removeItem("workout-session")
    await AsyncStorage.removeItem("routineId")
    await AsyncStorage.removeItem("routine-selected")
    await AsyncStorage.removeItem("timer");
    setWorkoutSession({} as TypeWorkoutSession)
    //setRoutineSelected({} as TypeRoutineSelected)
    setTimer({ minutes: 0, seconds: 0 })
    setStep(1)
    navigate("home")
  };

  function nextStep() {
    setStep(2)
  }
  function backStep() {
    if (step === 1) return;
    setStep(1)
  }

  async function getTimerValueInital() {
    const timer = await AsyncStorage.getItem("timer");
    const parsedTimer = timer ? JSON.parse(timer) : null;
    if (parsedTimer) setTimer(parsedTimer);
  }
  useEffect(() => {
    getTimerValueInital()
  }, [])

  function getWorkedGroup() {
    const groupsWorked: string[] = [];
    workoutSession?.exercises?.forEach(e => {
      if (e.series.length <= 0) return;
      const alreadyIncluds = groupsWorked.includes(e.group.toLocaleLowerCase());
      if (alreadyIncluds) return;
      groupsWorked.push(e.group.toLocaleLowerCase());
    })
    setWorkedGroups(groupsWorked);
  }

  function getTotalSetsInTraining() {
    let totalSeries = 0
    workoutSession?.exercises?.forEach(e => {
      totalSeries += e.series.length
    })
    return totalSeries
  }

  useEffect(() => {
    setWorkoutFromRoutine();
  }, [routineId, routineSelected])

  useEffect(() => {
    if (step === 2) getWorkedGroup();
  }, [step])


  const isFocused = useIsFocused();
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    if (!isFocused) return;
    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (appState.match(/active/) && nextAppState === 'background') {
        const status = finished ? "finished" : "not-finished"
        const workoutSessionWithState = {
          ...workoutSession,
          status,
        }
        await AsyncStorage.setItem("routine-selected", JSON.stringify(routineSelected))
        await AsyncStorage.setItem("workout-session", JSON.stringify(workoutSessionWithState));
        await AsyncStorage.setItem("routineId", JSON.stringify(routineId));
        await AsyncStorage.setItem("timer", JSON.stringify(timer));
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, workoutSession, isFocused]);

  useEffect(() => {
    async function saveTimer() {
      if (timer) {
        await AsyncStorage.setItem("timer", JSON.stringify(timer));
      }
    }
    saveTimer()
  })

  return (
    <View style={styles.container}>
      <HeaderTrainingSession
        nextStep={nextStep}
        backStep={backStep}
      />

      {
        step === 1 && (
          <View style={styles.main}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 44,
              }}
            >
              <Timer
                timer={timer}
                setTimer={setTimer}
              />
              <View style={styles.containerExerciseTrainingCard}>
                {workoutSession?.exercises?.map((item, index) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <ExerciseTrainingCard
                      key={item.id}
                      img={item.img_url}
                      exercise_id_in_exercises={item.exercise_id_in_exercises}
                      gif={item.gif}
                      exerciseId={Number(item.id)}
                      group={item.group}
                      exerciseName={item.name}
                      series={item.series}
                    />
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleNavigateExerciseCatalog}
                >
                  <Text style={styles.buttonText}>Adicionar exercicio</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )
      }

      {
        step === 2 && (
          <View style={styles.main}>
            <Text style={styles.title}>Resumo da sessão</Text>

            <View style={styles.containerDuration}>
              <Text style={styles.titleCard}>Duração</Text>
              <Text
                style={styles.textCard}
              >
                {String(timer.minutes).padStart(2, "0")}:{String(timer.seconds).padStart(2, "0")}
              </Text>

            </View>

            <View style={styles.containerCards}>
              <View style={styles.containerCard}>
                <Text style={styles.titleCard}>Total exercicios</Text>
                <Text style={styles.textCard}>{workoutSession?.exercises?.length}</Text>
              </View>

              <View style={styles.containerCard}>
                <Text style={styles.titleCard}>Total series</Text>
                <Text style={styles.textCard}>{getTotalSetsInTraining()}</Text>
              </View>

            </View>

            <Text style={styles.title}>Grupos trabalhados</Text>
            <View style={styles.containerGroups}>

              {
                workedGroups.length > 0 && workedGroups.map((w, index) => (
                  <View style={styles.cardGroup}>
                    <Text
                      key={index}
                      style={{ ...styles.title, textTransform: "capitalize" }}
                    >
                      {w}
                    </Text>
                  </View>
                ))
              }
            </View>

            <TouchableOpacity
              style={styles.buttonFinishTrainingSession}
              onPress={handleSaveTrainingSession}
            >
              <Text style={styles.buttonText}>Finalizar Sessão</Text>
            </TouchableOpacity>

          </View>
        )
      }
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
    marginBottom: 16,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "semibold",
    color: defaultTheme.colors.primaryText,
  },
  title: {
    fontSize: 18,
    color: defaultTheme.colors.primaryText,
  },
  containerDuration: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
    backgroundColor: defaultTheme.colors.backgroundComponents,
    marginVertical: 12,
  },
  containerCards: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  containerCard: {
    borderRadius: 10,
    width: "48%",
    maxWidth: 250,
    maxHeight: 150,
    paddingVertical: 12,
    backgroundColor: defaultTheme.colors.backgroundComponents,
    alignItems: "center",
    justifyContent: "center",
  },
  titleCard: {
    fontSize: 18,
    fontWeight: "bold",
    color: defaultTheme.colors.primaryText,
  },
  textCard: {
    fontSize: 44,
    fontWeight: "bold",
    color: defaultTheme.colors.primaryText,
  },
  containerGroups: {
    marginTop: 8,
    flexDirection: "row",
    gap: 12,
  },
  cardGroup: {
    width: "auto",
    paddingVertical: 12,
    backgroundColor: defaultTheme.colors.backgroundComponents,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  buttonFinishTrainingSession: {
    marginTop: 24,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: defaultTheme.colors.button,
    borderWidth: 2,
    height: 52,
    marginBottom: 12,
  },
})