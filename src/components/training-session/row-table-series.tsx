import { View, Text, StyleSheet } from "react-native";
import { defaultTheme } from "../../configs/default-theme";

export function RowTableSeries() {
    return (
        <View style={styles.container}>
            <Text style={styles.primaryText}>1</Text>
            <Text style={styles.primaryText}>12</Text>
            <Text style={styles.primaryText}>20</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection : "row",
    },
    primaryText : {
        width : "30%",
        fontSize : 16,
        color : defaultTheme.colors.primaryText
    }
})