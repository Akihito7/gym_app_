import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { defaultTheme } from "../../configs/default-theme";
import { Avatar } from "react-native-elements";
import ExerciseImg from "../../../assets/biceps.png"
import Feather from '@expo/vector-icons/Feather';
import { useContextRoutine } from "../../hooks/useContextRoutine";

type ParamsExerciseCard = {
  id: string;
  name: string;
  group: string;
}

export function ExerciseRoutineCard({ id, name, group }: ParamsExerciseCard) {
  const { routineSelected, setRoutineSelected } = useContextRoutine();

  function handleRemoveExerciseSelected() {
    setRoutineSelected(prev => {
      return {
        id: prev.id ?? null,
        name: prev.name ?? null,
        exercises: prev.exercises.filter(item => item.id !== id)
      }
    });
  };

  return (
    <TouchableOpacity>
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

        <TouchableOpacity onPress={handleRemoveExerciseSelected}>
          <Feather name="trash" size={28} color={defaultTheme.colors.defaultRed} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    paddingRight: 20,
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