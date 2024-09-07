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

type NavigationProps = StackNavigationProp<AuthRoutesType>;
export function Singln() {
  function handleNavigate(){
    navigate("signup")
  }
  const { navigate } : NavigationProps = useNavigation();
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
          <CustomInput placeholder="Email" type="text">
          <MaterialCommunityIcons name="email-outline" size={24} color="#E1E1E6" />
          </CustomInput>
          <CustomInput placeholder="Senha" type="password">
          <Feather name="lock" size={24} color="#E1E1E6" />
          </CustomInput>
          <Button w="full" bg="primary.button" borderRadius={10} mb={8} h={12} _pressed={{
            bg: "primary.button",
            opacity: "0.5"
          }}>
            <Text fontSize={16} color="primary.txtMain">Entrar</Text>
          </Button>
        </VStack>
        <VStack w="full" flex={1} justifyContent="space-between" alignItems="center">
          <TouchableOpacity>
            <Text fontSize={16} color="primary.txtMain" >Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <Button  w="full" bg="transparent" borderWidth={1} borderColor={"primary.button"} borderRadius={10} mb={4} h={12} _pressed={{
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