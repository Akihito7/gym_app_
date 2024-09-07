import { Box, Button, FlatList, HStack, Text, VStack } from "native-base";
import { Header } from "../components/header";
import { CardExerciseRoutine } from "../components/card-exercise-routine";
import Ionicons from '@expo/vector-icons/Ionicons';


const DATAMOCKED = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16];
export function WorkoutTracker() {
  return (
    <VStack flex={1} bg="primary.bg">
      <Header title="Sessão" />
      <VStack px={4} flex={1} mt={4}>
        <VStack mb={8}>
          <Text fontSize={16} color="primary.txtMain" fontWeight="bold">Peitoral e biceps</Text>
          <HStack alignContent="center" justifyContent="space-between">
            <Text fontSize={30} color="primary.txtMain" fontWeight="bold" >15:49</Text>
            <Ionicons name="pause" size={40} color="#E1E1E6" />
          </HStack>

        </VStack>
        <FlatList
          data={DATAMOCKED}
          keyExtractor={item => String(item)}
          renderItem={() => <CardExerciseRoutine activeSession={true} />}
          ItemSeparatorComponent={() => <Box mt={6} />}
          showsVerticalScrollIndicator={false}
          flex={1}
          marginBottom={8}
        />

        <Button bg="primary.button" borderRadius={10} mb={12} mt={2} _pressed={{
          bg: "primary.button",
          opacity: "0.5"
        }}>
          <Text fontSize={16} color="primary.txtMain">Encerrar treino</Text>
        </Button>
      </VStack>
    </VStack>
  )
}