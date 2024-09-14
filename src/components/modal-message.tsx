import { StyleSheet, View, Text } from "react-native"
import { useContextMessage } from "../hooks/useContextMessage"

export function ModalMessage() {

  const { message } = useContextMessage();

  return (
    <View style={{...styles.container, backgroundColor : message.type === "sucess" ? "#8bdd76"  : "#f07979"}}>
      <Text style={styles.message}>
        {message.message}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "10%",
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  message: {
    fontSize: 16,
    fontWeight: "semibold",
    textAlign: "center"
  }
})