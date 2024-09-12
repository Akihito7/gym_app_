import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { defaultTheme } from "../../configs/default-theme"
import { Avatar } from "react-native-elements"
import ExerciseImg from "../../../assets/biceps.png"
import { Feather } from "@expo/vector-icons"
import { HeaderTableSeries } from "./header-table-series"
import { RowTableSeries } from "./row-table-series"

type TypeExerciseTrainingCard = {
    id: number;
    name: string;
    group: string;
    series: {
        id: number;
        order: number;
        reps: number;
        kg: number
    }[]
}
export function ExerciseTrainingCard({ id, name, group, series }: TypeExerciseTrainingCard) {

    return (
        <View style={styles.container}>
            <View style={styles.containerExerciseInfo}>
                <Avatar
                    source={ExerciseImg}
                    size={64}
                    avatarStyle={{ borderRadius: 10 }}
                />

                <View style={styles.containerTextExercise} >
                    <Text style={styles.primaryText} numberOfLines={1}>Rosca com barra w</Text>
                    <Text style={styles.secondaryText}>Biceps</Text>
                </View>

                <TouchableOpacity>
                    <Feather name="trash" size={28} color={defaultTheme.colors.defaultRed} />
                </TouchableOpacity>


            </View>

            <View style={styles.containerTable}>
                <HeaderTableSeries />
                {
                    series.map(item => (
                        <RowTableSeries
                            id={item.id}
                            order={item.order}
                            kgsInital={item.kg}
                            repsInital={item.reps}
                        />
                    ))
                }

            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Nova serie</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    containerExerciseInfo: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: defaultTheme.colors.backgroundComponents,
        borderRadius: 10,
        paddingRight: 12,
    },
    containerTextExercise: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 16,
        paddingRight: 20,
    },
    primaryText: {
        fontSize: 16,
        color: defaultTheme.colors.primaryText,
    },
    secondaryText: {
        fontSize: 14,
        color: defaultTheme.colors.secondaryText,
    },
    containerTable: {
        marginTop: 12,
        gap: 8,
    },
    button: {
        width: "70%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: defaultTheme.colors.backgroundComponents,
        height: 52,
        marginTop: 8,
        marginBottom: 12,
    },
    buttonText: {
        fontSize: 16,
        color: defaultTheme.colors.primaryText
    }
})