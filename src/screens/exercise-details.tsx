import { Box, Button, HStack, Text, VStack } from "native-base";
import { Header } from "../components/header";
import { PhotoExerciseDetails } from "../components/photo-exercise-details";

export function ExerciseDetails() {
  return (
    <VStack flex={1} bg="primary.bg">
      <Header title="Detalhes exercicios" />
      <PhotoExerciseDetails />
      <VStack px={4}>
        <Text fontWeight="bold" fontSize={20} color="primary.txtMain" >Biceps Barra W</Text>
        <HStack space={4} mt={2}>
          <Box alignItems="center" justifyContent="center" variant="outline" w="1/3" h={8}borderWidth={1} borderColor="primary.button" borderRadius={5}>
          <Text fontSize={14} color="primary.txtMain" textAlign="center">Como fazer</Text>
          </Box>
          <Box alignItems="center" justifyContent="center" variant="outline" w="1/3"  h={8} borderWidth={1} borderColor="gray.100" borderRadius={5}>
            <Text fontSize={14} color="primary.txtMain">Metricas</Text>
          </Box>
        </HStack>

        <Text mt={2} fontSize={14} color="primary.txtMain" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nisi rerum odio assumenda itaque sit nam cumque fugiat, perspiciatis, voluptas veritatis, provident reprehenderit quisquam? Exercitationem ipsa cumque laboriosam necessitatibus non.</Text>
      </VStack>
    </VStack>
  )
}