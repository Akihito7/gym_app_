import { View, Text, StyleSheet } from "react-native"
import { defaultTheme } from "../configs/default-theme";

type ParamsInputErrorMessage = {
  message: string
}

export function InputErroMessage({ message }: ParamsInputErrorMessage) {
  return (
    <View style={styles.container}>
      <Text
        style={styles.message}
      >
        {message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    width : "100%",
    textAlign : "left",
  },
  message: {
    fontSize: 16,
    color: defaultTheme.colors.defaultRed
  }
})