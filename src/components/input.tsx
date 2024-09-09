import { StyleSheet, TextInput, View } from "react-native";
import { defaultTheme } from "../configs/default-theme";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from "react";

export function Input() {
  const [searchValue, setSearchValue] = useState("");
  
  return (
    <View style={styles.container}>
      <FontAwesome
        name="search"
        size={24}
        color={searchValue ? defaultTheme.colors.primaryText : "#474747" }
      />
      <TextInput
        style={styles.input}
        placeholder="Buscar por rotinas"
        placeholderTextColor="#474747"
        onChangeText={setSearchValue}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: defaultTheme.colors.backgroundComponents,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  input: {
    width: "100%",
    color: defaultTheme.colors.primaryText,
    fontSize: 16,
    marginLeft: 8,
  },
})