import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultTheme } from "../../configs/default-theme";

export function HistoryCard() {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.containerSessionInfo}>
          <Text style={styles.primaryText}>Peitoral pump maximo</Text>
          <Text style={styles.secondaryText}>01:45:00</Text>
        </View>
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
    paddingVertical : 12,
    paddingRight: 12,
  },
  containerSessionInfo: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
    paddingRight: 20,
    gap: 8,
  },
  primaryText: {
    fontSize: 18,
    color: defaultTheme.colors.primaryText,
  },
  secondaryText: {
    fontSize: 14,
    color: defaultTheme.colors.secondaryText,
  }
})