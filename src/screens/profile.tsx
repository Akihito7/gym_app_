import { Card, HStack, Text, VStack } from "native-base";
import { Header } from "../components/header";
import { UserPhoto } from "../components/user-photo";
import ProfileImg from "../../assets/xama.jpeg"
import { useUserContext } from "../contexts/user-context";

type CardStatisticsProps = {
  title: string;
  count: string;
}
function CardStatistics({ title, count }: CardStatisticsProps) {
  return (
    <VStack w={160} bg="primary.bgComponents" alignItems="center" borderRadius={10} py={4}>
      <Text fontWeight="bold" fontSize={16} color="primary.txtMain">{title}</Text>
      <Text fontWeight="bold" fontSize={40} color="primary.txtMain">{count}</Text>
    </VStack>
  )
}

function CardRecentsWorkout() {
  return (
    <VStack bg="primary.bgComponents">
      <Text mt={6} fontSize={18} color="primary.txtMain" mb={4}>Peito e biceps</Text>
    </VStack>
  )
}
export function Profile() {
  const { user } = useUserContext()
  return (
    <VStack flex={1} bg="primary.bg">
      <Header title="Profile" />
      <VStack px={4} mt={6}>

        <HStack alignItems="center">
          <UserPhoto sizes={16} source={ProfileImg} alt="Imagem do usuario" style={{
            objectFit: "cover"
          }} />
          <Text ml={4} fontWeight="bold" fontSize={18} color="primary.txtMain">{user.username}</Text>
        </HStack>


        <VStack mt={8}>
          <Text fontWeight="bold" fontSize={18} color="primary.txtMain" mb={4}>Geral</Text>
          <HStack justifyContent="space-between">
            <CardStatistics title="Sessoes de treino" count="10" />
            <CardStatistics title="Exercicios feitos" count="2100" />
          </HStack>

          <Text mt={6} fontSize={18} color="primary.txtMain" mb={4}>Ultimos treinos</Text>
        </VStack>
      </VStack>

    </VStack>
  )
}