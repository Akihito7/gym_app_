import { StyleSheet, View } from "react-native";
import { defaultTheme } from "../configs/default-theme";

export function ProfileScreen() {
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.colors.backgroundScreen,
  }
})