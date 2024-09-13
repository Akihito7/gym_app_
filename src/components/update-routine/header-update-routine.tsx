import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { defaultTheme } from "../../configs/default-theme"
import { View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

type TypeHeaderUpdateRoutine = {
  handleUpdateRoutine(): void;
}
export function HeaderUpdateRoutine({ handleUpdateRoutine }: TypeHeaderUpdateRoutine) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AntDesign
          name="back"
          size={32}
          color={defaultTheme.colors.primaryText}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Editar rotina</Text>


      <TouchableOpacity onPress={handleUpdateRoutine}>
        <AntDesign
          name="check"
          size={32}
          color={defaultTheme.colors.primaryText}
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