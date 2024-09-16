import { StyleSheet, View, Text, ScrollView } from "react-native";
import { defaultTheme } from "../configs/default-theme";
import { HeaderProfile } from "../components/profile/header-profile";
import { VictoryChart, VictoryLine } from "victory-native";
import { useCallback, useEffect, useState } from "react";
import { apiGetMetricsUser } from "../api/get-metrics-user";
import { useFocusEffect } from "@react-navigation/native";

/* const data = [
  { x: 1, y: 44 },
  { x: 2, y: 22 },
  { x: 3, y: 32 },
  { x: 4, y: 12 },
  { x: 5, y: 21 },
  { x: 6, y: 40 },
  { x: 7, y: 10 },
  { x: 8, y: 5 },
  { x: 9, y: 22 },
  { x: 10, y: 24 },
  { x: 11, y: 11 },
  { x: 12, y: 12 },
];
 */
type TypeMetrics = { category: string, total: string }


export function ProfileScreen() {
  const [metrics, setMetrics] = useState<TypeMetrics[]>([]);


  useFocusEffect(
    useCallback(() => {
      async function getMetricsUser() {
        const response = await apiGetMetricsUser();
        setMetrics(response);
      }
      getMetricsUser()
    }, []))

  return (
    <View style={styles.container}>
      <HeaderProfile />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.main}>

          <Text
            style={{...styles.titleCard, fontSize : 20}}
          >
            Estatísticas
          </Text>

          <View style={styles.containerTotalSessions}>
            <Text style={styles.titleCard}>Total sessões</Text>
            <Text style={styles.textCard}>{metrics[2]?.total}</Text>
          </View>

          <View style={styles.containerCards}>
            <View style={styles.containerCard}>
              <Text style={styles.titleCard}>Total exercicios</Text>
              <Text style={styles.textCard}>{metrics[0]?.total}</Text>
            </View>
            <View style={styles.containerCard}>
              <Text style={styles.titleCard}>Total series</Text>
              <Text style={styles.textCard}>{metrics[1]?.total}</Text>
            </View>
          </View>

          {/*           <View style={styles.chartContainer}>

            <Text
              style={styles.secondaryTitle}
            >
              Frequência de sessões
            </Text>
            
            <VictoryChart height={250}>
              <VictoryLine
                style={{
                  data: {
                    stroke: defaultTheme.colors.button,
                  },
                  labels : {
                    color : "red"
                  }
                }}
                data={data}
              />
            </VictoryChart>
          </View> */}

        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.colors.backgroundScreen,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  main: {
    paddingHorizontal: 20,
    marginBottom: 14,
    paddingTop: 24,
  },
  containerTotalSessions: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
    backgroundColor: defaultTheme.colors.backgroundComponents,
    marginVertical: 12,
  },
  containerCards: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  containerCard: {
    borderRadius: 10,
    width: "48%",
    maxWidth: 250,
    maxHeight: 150,
    paddingVertical: 12,
    backgroundColor: defaultTheme.colors.backgroundComponents,
    alignItems: "center",
    justifyContent: "center",
  },
  titleCard: {
    fontSize: 18,
    fontWeight: "bold",
    color: defaultTheme.colors.primaryText,
  },
  textCard: {
    fontSize: 44,
    fontWeight: "bold",
    color: defaultTheme.colors.primaryText,
  },
  chartContainer: {
    width: '100%',
    marginVertical: 20,
  },
  secondaryTitle: {
    fontSize: 18,
    color: defaultTheme.colors.secondaryText,
  }
});
