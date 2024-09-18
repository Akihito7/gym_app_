import { FlatList, StyleSheet, View, Text, TouchableOpacity, AppState } from "react-native";
import { Header } from "../components/home/header";
import { defaultTheme } from "../configs/default-theme";
import { RoutineCard } from "../components/home/routine-card";
import { Input } from "../components/home/input";
import { useNavigation, useFocusEffect, DefaultTheme } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TypeAppRoutes } from "../routes/app.routes";
import { useContextRoutine } from "../hooks/useContextRoutine";
import { apiGetUser } from "../api/get-user";
import { useEffect, useCallback, useState } from "react";
import { useContextUser } from "../hooks/useContextUser";
import { UserDTO } from "../dtos/user-DTO";
import { apiGetManyRoutines } from "../api/get-many-routines";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContextWorkout } from "../hooks/useContextWorkout";
import { TypeWorkoutSession } from "../contexts/context-workout";
import { TypeRoutineSelected } from "../contexts/context-routine";

type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>;

export function HomeScreen() {
  const { navigate } = useNavigation<TypeNavigation>();
  const { setRoutineSelected, routines, setRoutines,routineSelected } = useContextRoutine();
  const { setUser } = useContextUser();
  const { setShouldGetWorkout, setWorkoutSession, workoutSession } = useContextWorkout()


  function handleNavagiteToCreateRoutineAndSetRoutineContext() {
    setRoutineSelected({
      id: null,
      name: null,
      exercises: []
    });
    navigate("create-routine");
  }

  async function handleContinueWithTrainingSession(value: boolean) {
    if(routineSelected?.id){
      navigate("training-session", { routineId : Number(routineSelected.id), haveWorkoutSession : true});
    }
    const routineId = await AsyncStorage.getItem("routineId");
    if (value && routineId) {
      setShouldGetWorkout(true)
      navigate("training-session", { routineId: Number(routineId), haveWorkoutSession: true });
    } else {
      setShouldGetWorkout(false);
      setWorkoutSession({} as TypeWorkoutSession);
      setRoutineSelected({} as TypeRoutineSelected);
      await AsyncStorage.removeItem("workout-session");
      await AsyncStorage.removeItem("routineId");
      return
    }
  }

  async function getUser() {
    const user: UserDTO = await apiGetUser();
    setUser(user);
  }

  async function getManyRoutines() {
    const routines = await apiGetManyRoutines();
    setRoutines(routines);
  }

  useEffect(() => {
    getUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getManyRoutines();
    }, [])
  );


  useEffect(() => {
    console.log("entrei uma unica vez")
    async function getWorkout() {
      const workout = await AsyncStorage.getItem("workout-session");
      const routineSelected = await AsyncStorage.getItem("routine-selected");
      const parsedWorkout = workout ? JSON.parse(workout) : null
      const parsedRoutine = routineSelected ? JSON.parse(routineSelected) : null
      if (!parsedWorkout || !parsedRoutine) return;
      setWorkoutSession(parsedWorkout);
      setRoutineSelected(parsedRoutine);
    }
    getWorkout()
  }, []);

  useEffect(() => {
    console.log(workoutSession)
  }, [workoutSession])



  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.main}>
        <Input />
        <View style={styles.containerHeaderRoutines}>
          <Text style={styles.primaryText}>Minhas rotinas</Text>
          <Text style={styles.secondaryText}>( {routines.length} )</Text>
        </View>
        <FlatList
          data={routines}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <RoutineCard
              key={item.id}
              id={item.id ?? 0}
              name={item.name ?? ""}
              exercises={item.exercises}
              exercisesLength={item.exercises.length ?? 0}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 18,
          }}
        />
        <TouchableOpacity
          style={styles.buttonCreateRoutine}
          onPress={handleNavagiteToCreateRoutineAndSetRoutineContext}
        >
          <Text style={styles.buttonText}>Criar nova rotina</Text>
        </TouchableOpacity>
      </View>

      {
        workoutSession.name && (
          <View style={styles.containerHaveTrainingSessionActived}>
            <Text style={styles.titleContainerHaveTrainingSessionActived}>
              Você tem um treino ativo, deseja continuar?
            </Text>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginTop: 16
              }}>
              <TouchableOpacity
                style={{ ...styles.buttonAction, backgroundColor: "#8bdd76" }}
                onPress={() => handleContinueWithTrainingSession(true)}
              >
                <Text style={styles.textButtonAction}>Sim</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.buttonAction, backgroundColor: "#f07979" }}
                onPress={() => handleContinueWithTrainingSession(false)}
              >
                <Text style={styles.textButtonAction}>Não</Text>
              </TouchableOpacity>

            </View>

          </View>
        )
      }


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: defaultTheme.colors.backgroundScreen
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 14,
    paddingTop: 24,
  },
  containerHeaderRoutines: {
    flexDirection: "row",
    marginTop: 26,
    marginBottom: 16,
    alignItems: "center"
  },
  primaryText: {
    flex: 1,
    fontSize: 20,
    color: defaultTheme.colors.primaryText,
    fontWeight: "bold",
  },
  secondaryText: {
    fontSize: 16,
    color: defaultTheme.colors.secondaryText,
    fontWeight: "semibold",
  },
  buttonCreateRoutine: {
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
  },
  containerHaveTrainingSessionActived: {
    backgroundColor: defaultTheme.colors.backgroundComponents,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  titleContainerHaveTrainingSessionActived: {
    fontSize: 16,
    color: defaultTheme.colors.primaryText,
    marginTop: 8,
  },
  buttonAction: {
    width: 80,
    paddingVertical: 8,
    backgroundColor: defaultTheme.colors.defaultRed,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonAction: {
    fontSize: 16,
    color: defaultTheme.colors.primaryText,
  }
});

//"#8bdd76"
//"#f07979"
