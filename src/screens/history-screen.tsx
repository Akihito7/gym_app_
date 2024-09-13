import { SectionList, StyleSheet, Text, View } from "react-native";
import { HistoryCard } from "../components/history-screen/history-card";
import { defaultTheme } from "../configs/default-theme";
import { Header } from "../components/header";
import { useEffect } from "react";

const groupedData = [
  {
    title: '2024-09-10',
    data: [
      { id: 1, date: '2024-09-10', workout: 'Chest Workout', details: 'Bench press, push-ups' },
      { id: 2, date: '2024-09-10', workout: 'Leg Day', details: 'Squats, lunges' },
    ],
  },
  {
    title: '2024-09-11',
    data: [
      { id: 3, date: '2024-09-11', workout: 'Back Workout', details: 'Pull-ups, deadlifts' },
    ],
  },
];

export function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Header title="Historico" />
      <View style={styles.main}>
        <SectionList
          sections={groupedData}
          keyExtractor={item => String(item.id)}
          renderItem={() => <HistoryCard />}
          renderSectionHeader={(item) => (
            <Text
              style={styles.secondaryText}
            >
              {item.section.title}
            </Text>
          )}
          ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: defaultTheme.colors.backgroundScreen
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 14,
    paddingTop: 24,
  },
  secondaryText: {
    fontSize: 16,
    color: defaultTheme.colors.secondaryText,
    fontWeight: "semibold",
    marginVertical : 8,
  },
})