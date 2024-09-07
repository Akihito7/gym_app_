import { Button, HStack, Text, VStack } from "native-base";
import { PhotoCardRoutineExercise } from "./photo-card-exercise-routine";


function TableHeader({ activeSession } : {activeSession : boolean}) {
  return (
    <HStack w="full" mt={4}>
      <Text w={"1/3"} fontSize={16} color="primary.txtMain">Series</Text>
      <Text w={"1/3"} fontSize={16} color="primary.txtMain">Reps</Text>
      {activeSession&& <Text w={"1/3"} fontSize={16} color="primary.txtMain">Kg</Text>}
    </HStack>
  )
}

function RowTable({ activeSession } : {activeSession : boolean}) {
  return (
    <HStack w="full" mt={2}>
      <Text w={"1/3"} fontSize={16} color="primary.txtMain">1</Text>
      <Text w={"1/3"} fontSize={16} color="primary.txtMain">10</Text>
      {activeSession&& <Text w={"1/3"} fontSize={16} color="primary.txtMain">Kg</Text>}
    </HStack>
  )
}

export function CardExerciseRoutine({ activeSession } : {activeSession : boolean}) {
  return (
    <VStack>
      <HStack w={"full"} alignItems="center">
        <PhotoCardRoutineExercise />
        <VStack ml={4}>
          <Text fontSize={16} color="primary.txtMain">Biceps barra w</Text>
          <Text fontSize={14} color="primary.txtMain">Biceps</Text>
        </VStack>
      </HStack>
      <TableHeader activeSession={activeSession} />
      <RowTable activeSession={activeSession}/>
      <Button mt={2} bg="primary.bgComponents" _pressed={{
        bg: "primary.bgComponents",
        opacity: "0.5"
      }}>
        <Text fontSize={14} color="primary.txtMain">Adicionar serie</Text>
      </Button>
    </VStack>
  )
}