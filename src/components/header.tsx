import { StyleSheet, Text, View } from "react-native";
import { defaultTheme } from "../configs/default-theme";

type ParamsHeader = {
  title: string
}
export function Header({ title }: ParamsHeader) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems : "center",
    backgroundColor : defaultTheme.colors.backgroundHeader,
    paddingTop: 64,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight : "bold",
    color: defaultTheme.colors.primaryText
  }
})  