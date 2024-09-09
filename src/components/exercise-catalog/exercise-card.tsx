import { StyleSheet, View, Text } from "react-native";
import { defaultTheme } from "../../configs/default-theme";
import { Avatar } from "react-native-elements";
import ExerciseImg from "../../../assets/biceps.png"


export function ExerciseCard() {
  return (
    <View style={styles.container}>
      <Avatar
        source={ExerciseImg}
        size={64}
        avatarStyle={{ borderRadius: 10 }}
      />
      <View style={styles.containerExerciseInfo}>
        <Text style={styles.primaryText}>Biceps barra w</Text>
        <Text style={styles.secondaryText}>Biceps</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems : "center",
    flexDirection: "row",
    backgroundColor: defaultTheme.colors.backgroundComponents,
    borderRadius: 10,
    paddingRight : 12,
  },
  containerExerciseInfo: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  },
  primaryText: {
    fontSize: 16,
    color: defaultTheme.colors.primaryText,
  },
  secondaryText: {
    fontSize: 14,
    color: defaultTheme.colors.secondaryText,
  }
})