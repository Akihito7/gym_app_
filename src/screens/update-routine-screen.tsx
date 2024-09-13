import { FlatList, StyleSheet, TextInput, View } from "react-native"
import { defaultTheme } from "../configs/default-theme"
import { HeaderUpdateRoutine } from "../components/update-routine/header-update-routine"
import { InputUpdateRoutine } from "../components/update-routine/input-update-routine"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { ExerciseUpdateRoutineCard } from "../components/update-routine/exercise-update-routine-card"
import { useContextRoutine } from "../hooks/useContextRoutine"

export function UpdateRoutineScreen() {

  const { routineSelected } = useContextRoutine();

  return (
    <View style={styles.container}>
      <HeaderUpdateRoutine handleUpdateRoutine={() => { }} />

      <View style={styles.main}>
        <View style={styles.containerInputs}>
          <InputUpdateRoutine value="AIN">
            <MaterialIcons
              name="drive-file-rename-outline"
              size={32}
              color={defaultTheme.colors.primaryText}
            />
          </InputUpdateRoutine>

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
        </View>
        <FlatList
          data={routineSelected?.exercises}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ExerciseUpdateRoutineCard
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
  containerInputs: {
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
})