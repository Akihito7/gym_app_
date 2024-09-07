import { Button, ScrollView, Text, VStack } from "native-base";
import SvgUri from 'react-native-svg-uri';
import LogoIMG from "../../assets/academia.svg"
import { CustomInput } from "../components/input";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { AuthRoutesType } from "../routes/auth.routes";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProps = StackNavigationProp<AuthRoutesType>;
export function Signup() {
  const { navigate }: NavigationProps = useNavigation();

  function handleNavigate(){
    navigate("signln")
  }
  return (
    <VStack flex={1} bg="primary.bg">
      <ScrollView mt={8}>
        <VStack flex={1} px={4} alignItems="center" mt={24}>
          <SvgUri
            source={LogoIMG}
            width={60}
            height={60}
          />
          <Text mt={2} fontSize={32} fontWeight={"bold"} color="primary.txtMain">AkihitoGym</Text>

          <VStack flex={1} w="full" space={4} mt={8}>
            <CustomInput placeholder="Nome" type="text" >
              <Feather name="user" size={24} color="#E1E1E6" />
            </CustomInput>
            <CustomInput placeholder="Email" type="text" keyboardType="email-address">
              <MaterialCommunityIcons name="email-outline" size={24} color="#E1E1E6" />
            </CustomInput>
            <CustomInput placeholder="Senha" type="password">
              <Feather name="lock" size={24} color="#E1E1E6" />
            </CustomInput>
            <Button w="full" bg="primary.button" borderRadius={10} mb={8} h={12} _pressed={{
              bg: "primary.button",
              opacity: "0.5"
            }}>
              <Text fontSize={16} color="primary.txtMain">Criar conta</Text>
            </Button>
          </VStack>
          <Button w="full" bg="transparent" borderWidth={1} borderColor={"primary.button"} borderRadius={10} h={12} _pressed={{
            bg: "primary.button",
          }}
            onPress={handleNavigate}
          >
            <Text fontSize={16} color="primary.txtMain">Ja tenho uma conta</Text>
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  )
}