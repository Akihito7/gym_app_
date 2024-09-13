import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { defaultTheme } from "../../configs/default-theme";


type ParamsInput = TextInputProps & {
  children: React.ReactNode
  value : string;
  onChangeText? : (value : string) => void;
}
export function InputUpdateRoutine({ children, value, onChangeText, ...rest}: ParamsInput) {

  return (
    <View style={styles.container}>
      {children}
      <TextInput
        style={styles.input}
        placeholder="Buscar por rotinas"
        placeholderTextColor="#474747"
        onChangeText={onChangeText}
        value={value}
        {...rest}
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