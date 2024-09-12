import { StyleSheet, Text, View } from "react-native";
import { defaultTheme } from "../../configs/default-theme";

export function HeaderTableSeries() {
    return (
        <View style={styles.container}>
            <Text style={styles.primaryText}>Series</Text>
            <Text style={styles.primaryText}>Rep</Text>
            <Text style={styles.primaryText}>Kg</Text>
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
        fontWeight : "bold",
        color : defaultTheme.colors.primaryText
    }
})