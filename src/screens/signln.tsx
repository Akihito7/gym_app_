import { Button, Text, VStack } from "native-base";
import SvgUri from 'react-native-svg-uri';
import LogoIMG from "../../assets/academia.svg"
import { CustomInput } from "../components/input";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthRoutesType } from "../routes/auth.routes";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useUserContext } from "../contexts/user-context";
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from "react";
import { ErrorMessage } from "../components/error-message";

type ParamsLogin = {
  email: string;
  password: string;
}
type NavigationProps = StackNavigationProp<AuthRoutesType>;

const schemaValidation = yup.object({
  email: yup.string().email("Informe um email válido").required("Email é obrigatorio"),
  password: yup.string().min(8, "Minimo de 8 caracters").required("Senha é obrigatorio")
});

export function Singln() {
  const { navigate }: NavigationProps = useNavigation();
  function handleNavigate() {
    navigate("signup")
  };
  const { signln } = useUserContext();
  async function handleLogin({ email, password }: ParamsLogin) {
    await signln({ email, password })
  }
  const { control, handleSubmit, formState: { errors } } = useForm<ParamsLogin>({
    resolver: yupResolver(schemaValidation)
  })
  return (
    <VStack flex={1} bg="primary.bg">
      <VStack flex={1} px={4} alignItems="center" mt={32}>
        <SvgUri
          source={LogoIMG}
          width={60}
          height={60}
        />
        <Text mt={2} fontSize={32} fontWeight={"bold"} color="primary.txtMain">AkihitoGym</Text>

        <VStack w="full" space={4} mt={8}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => {
              const message = errors.email?.message;
              return (
                <>
                  <CustomInput placeholder="email" type="text" onChangeText={onChange} value={value}>
                    <MaterialCommunityIcons name="email-outline" size={24} color="#E1E1E6" />
                  </CustomInput>
                  {message && <ErrorMessage message={message} />}
                </>
              )
            }
            }
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => {
              const message = errors.password?.message;
              return (
                <>
                  <CustomInput placeholder="password" type="password" onChangeText={onChange} value={value}>
                    <Feather name="lock" size={24} color="#E1E1E6" />
                  </CustomInput>
                  {message && <ErrorMessage message={message} />}
                </>
              )
            }

            }
          />
          <Button w="full" bg="primary.button" borderRadius={10} mb={8} h={12} _pressed={{
            bg: "primary.button",
            opacity: "0.5"
          }}
            onPress={handleSubmit(handleLogin)}
          >
            <Text fontSize={16} color="primary.txtMain" >Entrar</Text>
          </Button>
        </VStack>
        <VStack w="full" flex={1} justifyContent="space-between" alignItems="center">
          <TouchableOpacity>
            <Text fontSize={16} color="primary.txtMain" >Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <Button w="full" bg="transparent" borderWidth={1} borderColor={"primary.button"} borderRadius={10} mb={4} h={12} _pressed={{
            bg: "primary.button",
          }}
            onPress={handleNavigate}
          >
            <Text fontSize={16} color="primary.txtMain">Criar conta</Text>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}