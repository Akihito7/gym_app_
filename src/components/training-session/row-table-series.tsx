import { View, Text, StyleSheet, Touchable, TouchableOpacity, TextInput } from "react-native";
import { defaultTheme } from "../../configs/default-theme";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

type ParamsRowTableSeries = {
    id : number;
    order : number;
    repsInital: number;
    kgsInital: number;
}

export function RowTableSeries({ id, order, repsInital, kgsInital}: ParamsRowTableSeries) {
    const [editMode, setEditMode] = useState(false);
    const [reps, setReps] = useState(repsInital);
    const [kgs, setKgs] = useState(kgsInital);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.primaryText}
                keyboardType="number-pad"
                maxLength={3}
                readOnly={true}
            />
            <TextInput
                style={styles.primaryText}
                keyboardType="number-pad"
                maxLength={3}
                value={String(reps)}
            />
            <TextInput
                style={styles.primaryText}
                keyboardType="number-pad"
                maxLength={3}
                value={String(kgs)}
            />
            <TouchableOpacity>
                <Feather name="edit" size={24} color={defaultTheme.colors.secondaryText} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    primaryText: {
        width: "30%",
        fontSize: 16,
        color: defaultTheme.colors.primaryText
    }
})