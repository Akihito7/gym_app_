import { StyleSheet, View } from "react-native"
import { defaultTheme } from "../configs/default-theme"

export function SignupScreen() {
  return (
    <View style={styles.container}>
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: defaultTheme.colors.backgroundScreen
  },
})