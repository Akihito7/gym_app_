import { StyleSheet, View } from "react-native";
import { defaultTheme } from "../configs/default-theme";

export function HistoryWorkoutDetails(){
  return (
    <View>

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
  }
})