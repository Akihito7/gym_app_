import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { defaultTheme } from "../../configs/default-theme"
import { View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

type TypeHeaderTrainingSession = {
  handleSaveTrainingSession() : void;
}
export function HeaderTrainingSession({ handleSaveTrainingSession } : TypeHeaderTrainingSession) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AntDesign
          name="back"
          size={32}
          color={defaultTheme.colors.primaryText}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Sessão Atual</Text>

      <TouchableOpacity onPress={handleSaveTrainingSession} >
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