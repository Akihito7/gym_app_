import { Button, Text, VStack } from "native-base";
import SvgUri from 'react-native-svg-uri';
import LogoIMG from "../../assets/academia.svg"
import { CustomInput } from "../components/input";
import { TouchableOpacity } from "react-native";

export function Singln() {
  return (
    <VStack flex={1} bg="primary.bg">
      <VStack flex={1} px={4} alignItems="center" mt={40}>
        <SvgUri
          source={LogoIMG}
          width={60}
          height={60}
        />
        <Text mt={2} fontSize={32} fontWeight={"bold"} color="primary.txtMain">AkihitoGym</Text>

        <VStack w="full" space={4} mt={8}>
          <CustomInput placeholder="Email" />
          <CustomInput placeholder="Senha" />
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

          <Button w="full" bg="transparent" borderWidth={1} borderColor={"primary.button"} borderRadius={10} mb={12} h={12} _pressed={{
            bg: "primary.button",
          }}>
            <Text fontSize={16} color="primary.txtMain">Criar conta</Text>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}