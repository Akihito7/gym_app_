import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultTheme } from "../../configs/default-theme";


type ParamsHistoryCard = {
  name: string;
  dateFinished: Date;
}

export function HistoryCard({ name, dateFinished }: ParamsHistoryCard) {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.containerSessionInfo}>
          <Text style={styles.primaryText}>{name}</Text>
          <Text style={styles.secondaryText}>{new Date(dateFinished).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}</Text>
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
    paddingVertical: 12,
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