import { HStack, IInputProps, Input } from "native-base";
import Feather from '@expo/vector-icons/Feather';

type CustomInputProps = IInputProps

export function CustomInput({ ...rest }: CustomInputProps) {
  return (
    <HStack alignItems="center" bg="primary.bgComponents" borderRadius={10} h={12} px={4}>
      <Feather name="search" size={24} color="#E1E1E6" />
      <Input
        fontSize={16}
        color={"primary.txtMain"}
        placeholder="Pesquise aqui"
        flex={1}
        borderWidth={0}
        _focus={{
          borderColor: "transparent",
          borderWidth: 0,
          backgroundColor: "transparent"
        }}
        {...rest}
      />
    </HStack>
  )
}