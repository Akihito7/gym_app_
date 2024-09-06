import { HStack, Text, VStack } from "native-base";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import localImage from "../../assets/icon.png"
import { UserPhoto } from "./userPhoto";
export function Header() {

  return (
    <VStack pt={16} pb={6} px={4} bg="primary.bgComponents">
      <HStack alignContent="center" justifyContent={"space-between"} w={"full"} mb={4}>
        <MaterialIcons name="menu" size={36} color="#E1E1E6" />
        <UserPhoto
          sizes={12}
          source={localImage}
          alt="imagem de perfil"
        />
      </HStack>
      <Text fontSize={26} fontWeight="bold" color="primary.txtMain">Hi, Akihito 👋</Text>
    </VStack>
  )
}