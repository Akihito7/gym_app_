import { Box, Button, FlatList, Input, Text, TextArea, useNativeBase, VStack } from "native-base";
import { Header } from "../components/header";
import { CardExerciseRoutine } from "../components/card-exercise-routine";
import { useEffect, useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CustomInput } from "../components/input";
import { Feather } from "@expo/vector-icons";
import { useUserContext } from "../contexts/user-context";
import { RoutineWithDetailsDTO } from "../dtos/routine-with-details";
import { fetchRoutineWithDetails } from "../api/fetch-routine-with-details";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppRoutesType } from "../routes/app.routes";

type NavigationProps = BottomTabNavigationProp<AppRoutesType>
type Steps = 1 | 2
const DATAMOCKED = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16];
export function CreateRoutine() {
  const [step, setStep] = useState<Steps>(1);

  const { navigate }: NavigationProps = useNavigation()
  function handleNavigate() {
    navigate("exercise-library")
  }
  return (
    <VStack flex={1} bg="primary.bg">
      <Header title="Criar rotina" />
      {step === 1 &&
        <VStack px={4} flex={1} mt={4}>


          <Button bg="primary.button" borderRadius={10} mb={12} mt={2} _pressed={{
            bg: "primary.button",
            opacity: "0.5"
          }}
            onPress={handleNavigate}
          >
            <Text fontSize={16} color="primary.txtMain">Adicionar exercicios</Text>
          </Button>
        </VStack>
      }
      {
        step === 2 &&
        <VStack>
          <Button alignItems="center" justifyContent="center" mt={4} bg="primary.bgComponents" h={300} _pressed={{
            bg: "primary.bgComponents",
            opacity: "0.5"
          }}>
            <VStack justifyContent="center" alignItems="center">
              <MaterialIcons name="add-photo-alternate" size={40} color="#E1E1E6" />
            </VStack>
            <Text fontSize={16} color="primary.txtMain">Adicionar imagem</Text>
          </Button>

          <VStack px={4}>
            <CustomInput placeholder="Nome da rotina">
              <Feather name="search" size={24} color="#E1E1E6" />
            </CustomInput>
            <TextArea autoCompleteType fontSize={16}
              mt={2}
              bg={"primary.bgComponents"}
              color={"primary.txtMain"}
              placeholder="Notas sobre rotina"
              borderWidth={0}
              h={120}
              _focus={{
                borderColor: "transparent",
                borderWidth: 0,
                backgroundColor: "primary.bgComponents"
              }} />
            <Button bg="primary.button" borderRadius={10} mb={12} mt={2} _pressed={{
              bg: "primary.button",
              opacity: "0.5"
            }}>
              <Text fontSize={16} color="primary.txtMain">Finalizar</Text>
            </Button>
          </VStack>
        </VStack>
      }
    </VStack>
  )
}