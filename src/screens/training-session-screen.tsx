import { StyleSheet, View } from "react-native";
import { defaultTheme } from "../configs/default-theme";
import { Header } from "../components/header";
import { Timer } from "../components/training-session/timer";
import { ExerciseTrainingCard } from "../components/training-session/exercise-training-card";

export function TrainingSessionScreen() {
    return (
        <View style={styles.container}>
            <Header title="Sessão atual" />
            <View style={styles.main}>
                <Timer />
                <View style={styles.containerExerciseTrainingCard}>
                    <ExerciseTrainingCard />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultTheme.colors.backgroundScreen
    },
    main: {
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: 14,
        paddingTop: 24,
    },
    containerExerciseTrainingCard: {
        marginTop : 16  ,
    }
})