import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { defaultTheme } from "../../configs/default-theme";
import { Avatar } from "react-native-elements";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Avatar
          size={64}
          source={{ uri: "https://avatars.githubusercontent.com/u/121524719?v=4" }}
          rounded
          containerStyle={{ marginRight: 16 }}
        />
      </TouchableOpacity>
      <Text
        style={styles.title}>
        Hi, Akihito 👋
      </Text>
      <TouchableOpacity>
        <MaterialIcons
          name="logout"
          size={32}
          color="#ffffff"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: defaultTheme.colors.backgroundHeader,
    paddingTop: 64,
    paddingBottom: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    flex: 1
  }
})