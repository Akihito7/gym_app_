import { StyleSheet, View, Text } from "react-native";
import { defaultTheme } from "../configs/default-theme";
import { useContextUser } from "../hooks/useContextUser";

export function AvatarInitals() {
  // Simula um carregamento. Substitua isso com uma condição real.
  const { user } = useContextUser()
  const isLoading = !user.password;

  const initialLetter = user.username.charAt(0);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.skeleton} />
      ) : (
        <Text style={styles.letter}>
          {initialLetter.toUpperCase()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: 64,
    borderRadius: 999,
    backgroundColor: defaultTheme.colors.button,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",

  },
  skeleton: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: '#e0e0e0', 
    borderColor: '#d0d0d0',
    borderWidth: 1,
  },
  letter: {
    fontSize: 44,
    color: defaultTheme.colors.primaryText,
    fontWeight: "bold",
    lineHeight : 54,
  },
});
