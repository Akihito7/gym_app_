import { Box, Button, HStack, Text, VStack } from "native-base";
import { HeaderHome } from "../components/header-home";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CustomInput } from "../components/input";
import { CardWorkout } from "../components/card-workout";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { fetchRoutines } from "../api/fetch-routines";
import { useUserContext } from "../contexts/user-context";
import { useEffect, useState } from "react";
import { RoutinesDTO } from "../dtos/routines";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppRoutesType } from "../routes/app.routes";

type CardOptionProps = {
  title: string;
  children: React.ReactNode
}
function CardOption({ title, children }: CardOptionProps) {
  return (
    <Button w={160} bg={"primary.bgComponents"} py={4} _pressed={{
      bg: "primary.bgComponents",
      opacity: ".5"
    }}>
      <VStack alignItems="center">
        {children}
      </VStack>
      <Text fontSize={16} color="primary.txtMain" mt={2}>
        {title}
      </Text>
    </Button>
  );
}

const DATAMOCKED = [1, 2, 3, 4, 5, 6];
type NavigationProps = BottomTabNavigationProp<AppRoutesType>
export function Home() {
  const { setRoutineId, routineId } = useUserContext();
  const [routines, setRoutines] = useState<RoutinesDTO[]>([])
  const { user } = useUserContext()
  async function getRoutines() {
    const routines = await fetchRoutines(String(user.id));
    setRoutines(routines!)
  }

  const { navigate }: NavigationProps = useNavigation();
  function handleNavigation(routineId: number | null) {
    setRoutineId(routineId)
    navigate('create-routine');
  }
  useEffect(() => {
    getRoutines()
  }, []);
  return (
    <VStack flex={1} bg="primary.bg">
      <HeaderHome />
      <VStack flex={1} mt={2} padding={4}>
        <HStack justifyContent="space-between" mb={6}>
          <CardOption title="Nova rotina">
            <FontAwesome5 name="clipboard-list" size={40} color="#E1E1E6" />
          </CardOption>
          <CardOption title="Treino rapido">
            <AntDesign name="plus" size={40} color="#E1E1E6" />
          </CardOption>
        </HStack>
        <CustomInput >
          <Feather name="search" size={24} color="#E1E1E6" />
        </CustomInput>
        <Text fontSize={16} color="primary.txtMain" mt={4} mb={4}>
          Minhas rotinas
        </Text>
        <FlatList
          data={routines}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => <CardWorkout title={item.name} onPress={() => { handleNavigation(item.id) }} />}
          ItemSeparatorComponent={() => <Box mt={2} />}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </VStack>
  );
}
