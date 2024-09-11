import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { defaultTheme } from "../../configs/default-theme"
import { View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

type TypeHeaderCreateRoutine = {
  nextStep(): void;
  backStep(): void;
}
export function HeaderCreateRoutine({ nextStep, backStep }: TypeHeaderCreateRoutine) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={backStep}>
        <AntDesign
          name="back"
          size={32}
          color={defaultTheme.colors.iconActiveTintColor}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Criar rotina</Text>

      <TouchableOpacity onPress={nextStep}>
        <AntDesign
          name="check"
          size={32}
          color={defaultTheme.colors.iconActiveTintColor}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: defaultTheme.colors.backgroundHeader,
    paddingTop: 64,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: defaultTheme.colors.primaryText
  }
})  