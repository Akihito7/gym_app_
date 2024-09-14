import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { defaultTheme } from "../configs/default-theme"
import Logo from "../../assets/academia.svg"
import { Input } from "../components/input"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TypeAuthRoutes } from "../routes/auth.routes"
import { useNavigation } from "@react-navigation/native"
import { useForm, Controller } from "react-hook-form"
import { InputErroMessage } from "../components/input-error-message"
import * as Yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useContextUser } from "../hooks/useContextUser"
import { useContextMessage } from "../hooks/useContextMessage"
import { ModalMessage } from "../components/modal-message"

const schema = Yup.object({
  email: Yup.string().email("Preencha com email válido").required("Email é obrigátorio"),
  password: Yup.string().min(8, "Pelo menos 8 caracteres").required("Senha é obrigátorio")
});

type TypeNavigation = StackNavigationProp<TypeAuthRoutes>

type ParamsUseForm = {
  email : string;
  password : string
}

export function SignlnScreen() {
  const { navigate } = useNavigation<TypeNavigation>();
  const { handleSubmit, control, formState: { errors } } = useForm<ParamsUseForm>({
    resolver: yupResolver(schema)
  });

  const { setMessage, message } = useContextMessage()

  const { signln } = useContextUser()

  function handleNavigateSignup() {
    navigate("signup")
  }

  function handleLogin({email, password} : ParamsUseForm){
    signln({email, password})
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

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Email"
                  onChangeText={onChange}
                  value={value}
                >
                  <MaterialIcons
                    name="email"
                    size={24}
                    color={defaultTheme.colors.secondaryText}
                  />
                </Input>
                {errors.email?.message && <InputErroMessage message={errors.email.message} />}
              </>
            )}
          />


          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Senha"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                >
                  <FontAwesome
                    name="lock"
                    size={30}
                    color={defaultTheme.colors.secondaryText}
                  />
                </Input>
                {errors.password?.message && <InputErroMessage message={errors.password.message} />}
              </>
            )}
          />
          <TouchableOpacity
           style={styles.buttonLogin}
           onPress={handleSubmit(handleLogin)}
           >
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
      {message.message && <ModalMessage />}
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