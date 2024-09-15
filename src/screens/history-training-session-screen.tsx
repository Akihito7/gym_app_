import { FlatList, StyleSheet, Text, View } from "react-native";
import { HistoryCard } from "../components/history-training-session/history-card";
import { defaultTheme } from "../configs/default-theme";
import { Header } from "../components/header";
import { useCallback, useEffect, useState } from "react";
import { useContextUser } from "../hooks/useContextUser";
import { apiGetHistoryTrainingSessions } from "../api/get-history-training-sessions";
import { useFocusEffect } from "@react-navigation/native";



type TypeHistory = {
  id: number;
  name: string;
  duration: string;
  created_at: Date;
};

export function HistoryTrainingSession() {
  const { user } = useContextUser();

  const [history, setHistory] = useState([] as TypeHistory[])


  useFocusEffect(
    useCallback(() => {
      async function getHistoryTrainingSessions() {
        const history = await apiGetHistoryTrainingSessions(user.id);
        setHistory(history);
      }
      getHistoryTrainingSessions()
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header title="Historico" />
      <View style={styles.main}>
        <FlatList
          data={history}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View>
              <HistoryCard
                name={item.name}
                dateFinished={item.created_at}
              />
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: defaultTheme.colors.backgroundScreen,
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
    marginVertical: 8,
  },
});
