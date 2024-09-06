import { Button, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

export function CardWorkout() {
  return (
    <TouchableOpacity style={{
      flexDirection: 'row',
      alignItems: 'flex-start', // Alinha os itens ao início do eixo transversal
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#202024',
      borderRadius: 10,
    }}>
      <VStack>
        <Text fontSize={16} color="primary.txtMain">Peito e triceps</Text>
        <Text fontSize={14} color="primary.txtMain">12 exercícios</Text>
      </VStack>
      <Button w={20} bg="primary.button" _pressed={{
        bg : "primary.button",
        opacity : "0.5"
      }}>
        <Text fontSize={14} color="primary.txtMain" >Start</Text>
      </Button>
    </TouchableOpacity>
  )
}