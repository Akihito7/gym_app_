import { Box, Button, FlatList, Text, VStack } from "native-base";
import { CustomInput } from "../components/input";
import { Header } from "../components/header";
import { Select } from "native-base";
import { CardExercise } from "../components/card-exercise";
import { Feather } from "@expo/vector-icons";
import { fetchExercises } from "../api/fetch-exercises";
import { useEffect, useState } from "react";
import { ExercisesLibraryDTO } from "../dtos/exercises-library";

const DATAMOCKED = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function ExerciseLibrary() {
  const [exercises, setExercises] = useState<ExercisesLibraryDTO[]>()
  async function getManyExercises() {
    const response = await fetchExercises();
    setExercises(response)
  }

  useEffect(() => {
    getManyExercises()
  }, [])
  return (
    <VStack flex={1} bg="primary.bg">
      <Header title="Exercicios" />
      <VStack px={4} mt={4} flex={1}>
        <CustomInput placeholder="Pesquise aqui">
          <Feather name="search" size={24} color="#E1E1E6" />
        </CustomInput>
        <Select
          borderWidth={0}
          bg="primary.bgComponents"
          borderRadius={10}
          color={"primary.txtMain"}
          fontSize={14}
          placeholder="Filtre por musculos"
          h={10}
          mt={2}
          w={"50%"}
        >
          <Select.Item label="Peito" value="peito" />
          <Select.Item label="Biceps" value="biceps" />
          <Select.Item label="Quadriceps" value="quadriceps" />
        </Select>
        <VStack flex={1} mt={8} mb={4}>
          <Text fontSize={16} color="primary.txtMain" mb={4}>
            Todos os exercícios
          </Text>
          <FlatList
            data={exercises}
            keyExtractor={item => String(item)}
            renderItem={({ item }) => <CardExercise exercise={item} />}
            ItemSeparatorComponent={() => <Box mt={2} />}
            showsVerticalScrollIndicator={false}
            flex={1}
            marginBottom={8}
          />

          <Button bg={"primary.button"} _pressed={{
            bg: "primary.button",
            opacity: ".5"
          }}>
            <Text fontSize={16} color="primary.txtMain">Adicionar</Text>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
}
