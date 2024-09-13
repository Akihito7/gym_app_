import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { defaultTheme } from "../configs/default-theme"
import Logo from "../../assets/academia.svg"
import { Input } from "../components/input"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TypeAuthRoutes } from "../routes/auth.routes"
import { useNavigation } from "@react-navigation/native"


type TypeNavigation = StackNavigationProp<TypeAuthRoutes>

export function SignlnScreen() {
  const { navigate } = useNavigation<TypeNavigation>();
  function handleNavigateSignup() {
    navigate("signup")
  }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.containerHeader}>
          <Logo
            width={64}
            height={64}
            fill={defaultTheme.colors.primaryText}
          />

          <Text
            style={styles.title}
          >
            AkihitoGym
          </Text>
        </View>

        <View style={styles.containerInputs}>

          <Input placeholder="Email">
            <MaterialIcons name="email" size={24} color={defaultTheme.colors.secondaryText} />
          </Input>

          <Input placeholder="Senha">
            <FontAwesome name="lock" size={30} color={defaultTheme.colors.secondaryText} />
          </Input>

          <TouchableOpacity style={styles.buttonLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text style={styles.forgetPassword}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.buttonCreateAccount}
            onPress={handleNavigateSignup}
          >
            <Text style={styles.buttonText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    width: "100%",
    backgroundColor: defaultTheme.colors.backgroundScreen
  },
  main: {
    paddingTop: "40%",
    paddingHorizontal: 16,
    width: "100%",
    flex: 1,
  },
  containerHeader: {
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    color: defaultTheme.colors.primaryText,
    fontWeight: "bold"
  },
  containerInputs: {
    gap: 8,
    flex: 1,
    alignItems: "center",
  },

  buttonLogin: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: defaultTheme.colors.button,
    height: 52,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "semibold",
    color: defaultTheme.colors.primaryText,
  },
  forgetPassword: {
    fontSize: 16,
    color: defaultTheme.colors.secondaryText
  },
  buttonCreateAccount: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: defaultTheme.colors.button,
    borderWidth: 1,
    height: 52,
    marginBottom: 12,
  }
})