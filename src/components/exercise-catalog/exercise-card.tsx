import { StyleSheet, View, Text } from "react-native";
import { defaultTheme } from "../../configs/default-theme";
import { Avatar } from "react-native-elements";
import ExerciseImg from "../../../assets/biceps.png"
import { CheckBox } from "react-native-elements";
import { useState } from "react";

type ParamsExerciseCard = {
  id: number;
  name: string;
  group: string;
}

export function ExerciseCard({ id, name, group }: ParamsExerciseCard) {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Avatar
        source={ExerciseImg}
        size={64}
        avatarStyle={{ borderRadius: 10 }}
      />
      <View style={styles.containerExerciseInfo}>
        <Text style={styles.primaryText} numberOfLines={1}>{name}</Text>
        <Text style={styles.secondaryText}>{group}</Text>
      </View>

      <CheckBox size={28} checked={checked} onPress={() => {
        console.log("Exercise selected =>", id)
        setChecked(prev => !prev)
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: defaultTheme.colors.backgroundComponents,
    borderRadius: 10,
    paddingRight: 12,
  },
  containerExerciseInfo: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
    paddingRight : 20,
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