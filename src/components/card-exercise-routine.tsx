import { Button, HStack, Text, VStack } from "native-base";
import { PhotoCardRoutineExercise } from "./photo-card-exercise-routine";
import { Exercises } from "../dtos/exercises";


function TableHeader({ activeSession }: { activeSession: boolean }) {
  return (
    <HStack w="full" mt={4}>
      <Text w={"1/3"} fontSize={16} color="primary.txtMain">Series</Text>
      <Text w={"1/3"} fontSize={16} color="primary.txtMain">Reps</Text>
      {activeSession && <Text w={"1/3"} fontSize={16} color="primary.txtMain">Kg</Text>}
    </HStack>
  )
}

type ParamsRowTable = {
  activeSession : boolean;
  reps : number
  series_number : number;
}

function RowTable({ activeSession, reps, series_number }: ParamsRowTable) {
  return (
    <HStack w="full" mt={2}>
      <Text w={"1/3"} fontSize={16} color="primary.txtMain">{series_number}</Text>
      <Text w={"1/3"} fontSize={16} color="primary.txtMain">{reps}</Text>
      {activeSession && <Text w={"1/3"} fontSize={16} color="primary.txtMain">Kg</Text>}
    </HStack>
  )
}

type ParamsCardExerciseRoutine = {
  activeSession: boolean;
  exercise: Exercises
}
export function CardExerciseRoutine({ activeSession, exercise }: ParamsCardExerciseRoutine) {
  return (
    <VStack>
      <HStack w={"full"} alignItems="center">
        <PhotoCardRoutineExercise />
        <VStack ml={4}>
          <Text fontSize={16} color="primary.txtMain">{exercise.name}</Text>
          <Text fontSize={14} color="primary.txtMain">{exercise.name}</Text>
        </VStack>
      </HStack>
      <TableHeader activeSession={activeSession} />
      {
        exercise.series.length > 0 && exercise.series.map(item => (
          <RowTable activeSession={activeSession}  series_number={item.series_number} reps={item.reps} />
        ))
      }
      <Button mt={2} bg="primary.bgComponents" _pressed={{
        bg: "primary.bgComponents",
        opacity: "0.5"
      }}>
        <Text fontSize={14} color="primary.txtMain">Adicionar serie</Text>
      </Button>
    </VStack>
  )
}