import { HStack, Image, Text, VStack, Checkbox} from "native-base";
import ExerciseImg from "../../assets/exercise.png"

export function CardExercise() {
  return (
    <HStack w="full" bg="primary.bgComponents" borderRadius={10} alignItems="center">
      <Image
        source={ExerciseImg}
        alt="Imagem do exercicio"
        width={16}
        height={16}
        style={{
          objectFit: "contain"
        }}
        mr={4}
      />

      <VStack flex={1}>
        <Text fontSize={16} color="primary.txtMain">Biceps barra w</Text>
        <Text fontSize={16} color="primary.txtMain" >Biceps</Text>
      </VStack>

      <Checkbox h={12} w={12} value=""/>
    </HStack>
  )
}