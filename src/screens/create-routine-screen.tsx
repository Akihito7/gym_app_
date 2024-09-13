import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Input } from "../components/input";
import { ExerciseRoutineCard } from "../components/create-routine/exercise-routine-card";
import { defaultTheme } from "../configs/default-theme";
import { useContextRoutine } from "../hooks/useContextRoutine";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TypeAppRoutes } from "../routes/app.routes";
import { HeaderCreateRoutine } from "../components/create-routine/header-create-routine";
import { useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TypeRoutineSelected } from "../contexts/context-routine";

type TypeStep = 1 | 2
type TypeNavigation = BottomTabNavigationProp<TypeAppRoutes>

export function CreateRoutineScreen() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [routineName, setRoutineName] = useState("");
  const { navigate } = useNavigation<TypeNavigation>();
  const { routineSelected, setRoutineSelected, setRoutines } = useContextRoutine()

  const [step, setStep] = useState<TypeStep>(1);

  function nextStep() {
    setStep(2)
  };
  function backStep() {
    setStep(1)
  };
  function handleInputValue(value: string) {
    setSearchInputValue(value)
  };

  function handleChangeRoutineName(value: string) {
    setRoutineName(value);
  }

  function handleCreateRoutine() {
    const newRoutine = {
      ...routineSelected,
      id: 1,
      name: routineName
    } as TypeRoutineSelected;
    setStep(1);
    setRoutines(prev => [...prev, newRoutine]);
    setRoutineName("");
    setRoutineSelected({
      id: null,
      name: null,
      exercises: []
    });
    navigate("home");
  }

  return (
    <View style={styles.container}>
      <HeaderCreateRoutine
        nextStep={nextStep}
        backStep={backStep}
        step={step}
      />

      <View style={styles.main}>
        {
          step === 1 && routineSelected!.exercises.length > 0 && (
            <>
              <Input
                placeholder="Busque pelo nome"
                onChangeText={handleInputValue}
              >
                <FontAwesome
                  name="search"
                  size={24}
                  color={defaultTheme.colors.primaryText}
                />
              </Input>
              <FlatList
                data={
                  searchInputValue
                    ? routineSelected!.exercises.filter(item => item.name.toLowerCase().includes(searchInputValue.toLowerCase()))
                    : routineSelected!.exercises
                }
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <ExerciseRoutineCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    group={item.group}
                    gif={item.gif}
                    description={item.description}
                  />)}
                ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
                showsVerticalScrollIndicator={false}
                style={{
                  marginBottom: 18,
                  marginTop: 24,
                }}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigate("exercise-catalog")}
              >
                <Text style={styles.primaryText}>Adicionar exercicio</Text>
              </TouchableOpacity>

            </>
          )
        }

        {
          step === 1 && routineSelected!.exercises.length <= 0 && (
            <>
              <View style={styles.empty}>
                <Text style={styles.primaryText}>Nenhum exercicio adicionado</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigate("exercise-catalog")}
                >
                  <Text style={styles.primaryText}>Adicionar exercicio</Text>
                </TouchableOpacity>
              </View>
            </>
          )
        }

        {
          step === 2 && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.containerStepTwo}>
                <Input
                  placeholder="Nome da sua rotina"
                  onChangeText={handleChangeRoutineName}
                >
                  <MaterialIcons
                    name="drive-file-rename-outline"
                    size={32}
                    color={defaultTheme.colors.primaryText}
                  />
                </Input>

                <View style={styles.containerTextArea}>
                  <FontAwesome
                    name="pencil-square-o"
                    size={32}
                    color={defaultTheme.colors.primaryText}
                  />

                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textArea}
                    placeholder="Notas sobre a rotina"
                    placeholderTextColor="#474747"
                  />
                </View>

                <TouchableOpacity
                  style={styles.buttonFinisheRoutine}
                  onPress={handleCreateRoutine}
                >
                  <Text
                    style={styles.buttonTextFinisheRoutine}
                  >
                    Finalizar
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )
        }
      </View>
    </View>
  )
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
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  primaryText: {
    fontSize: 20,
    color: defaultTheme.colors.secondaryText,
    fontWeight: "400",
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
  },
  containerStepTwo: {
    gap: 8,
  },
  containerTextArea: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: defaultTheme.colors.backgroundComponents,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
  },
  textArea: {
    width: "100%",
    height: "auto",
    textAlignVertical: 'top',
    fontSize: 16,
    color: defaultTheme.colors.primaryText,
    marginLeft: 8,
  },
  buttonFinisheRoutine: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: defaultTheme.colors.button,
    height: 52,
    marginBottom: 12,
  },
  buttonTextFinisheRoutine: {
    fontSize: 18,
    fontWeight: "semibold",
    color: defaultTheme.colors.primaryText,
  }
})
