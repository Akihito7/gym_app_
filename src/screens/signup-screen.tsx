import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { defaultTheme } from "../configs/default-theme"
import Logo from "../../assets/academia.svg"
import Person from "../../assets/person.svg"
import { Input } from "../components/input"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StackNavigationProp } from "@react-navigation/stack";
import { TypeAuthRoutes } from "../routes/auth.routes"
import { useNavigation } from "@react-navigation/native"
import { useContextUser } from "../hooks/useContextUser"
import { useForm, Controller } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { InputErroMessage } from "../components/input-error-message"
import { ModalMessage } from "../components/modal-message"
import { useContextMessage } from "../hooks/useContextMessage"
import { apiSignup } from "../api/signup"


const schema = Yup.object({
  username: Yup.string().required("Username é obrigátorio").min(8, "Pelo menos 8 caracteres"),
  email: Yup.string().email("Preencha com email válido").required("Email é obrigátorio"),
  password: Yup.string().min(8, "Pelo menos 8 caracteres").required("Senha é obrigátorio")
});

type ParamsUseForm = {
  username: string;
  email: string;
  password: string
}
type TypeNavigation = StackNavigationProp<TypeAuthRoutes>

export function SignupScreen() {

  const { navigate } = useNavigation<TypeNavigation>();
  const { signup } = useContextUser();
  const { handleSubmit, control, formState: { errors } } = useForm<ParamsUseForm>({
    resolver: yupResolver(schema)
  })
  
  const { message,setMessage } = useContextMessage()

  function handleNavigateSignln() {
    navigate("signln")
  };

  async function handleCreateAccount({ username, email, password }: ParamsUseForm) {
    try {
      signup({ username, email, password })
      setMessage({
        message: "Conta criada com sucesso",
        type: "sucess"
      });
      
      
    } catch (error: any) {
      setMessage({
        message: error.message,
        type: "failure"
      })
    }
  };

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
            name="username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Username"
                  onChangeText={onChange}
                  value={value}
                >
                  <Person
                    width={24}
                    height={24}
                    fill={defaultTheme.colors.secondaryText}
                  />
                </Input>
                {errors.username?.message && <InputErroMessage message={errors.username.message} />}
              </>
            )}
          />

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

          <View style={{ flex: 1, width: "100%" }}>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={handleSubmit(handleCreateAccount)}
            >
              <Text style={styles.buttonText}>Criar conta</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.buttonCreateAccount}
            onPress={handleNavigateSignln}
          >
            <Text
              style={styles.buttonText}
            >
              Ja tenho conta!
            </Text>
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