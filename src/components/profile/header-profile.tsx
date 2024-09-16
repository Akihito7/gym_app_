import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { defaultTheme } from "../../configs/default-theme";
import { Avatar } from "react-native-elements";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useContextUser } from "../../hooks/useContextUser";
import { AvatarInitals } from "../avatar-initials";
import { useEffect } from "react";
import { apiGetMetricsUser } from "../../api/get-metrics-user";

export function HeaderProfile() {
  const { logout, user } = useContextUser();
  return (
    <View style={styles.container}>

      <TouchableOpacity>
        {
          user.url_photo && (
            <Avatar
              size={64}
              source={{ uri: "https://avatars.githubusercontent.com/u/121524719?v=4" }}
              rounded
              containerStyle={{ marginRight: 12 }}
            />
          )
        }

        {!user.url_photo && user.username && (
          <AvatarInitals />)
        }
      </TouchableOpacity>
      <Text
        style={styles.title}>
        {user.username}
      </Text>
      <TouchableOpacity onPress={logout}>
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