import { Text, VStack } from "native-base";

type HeaderProps = {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <VStack  pt={16} pb={6} px={4} bg="primary.bgComponents" alignItems="center">
      <Text fontSize={22} fontWeight="bold" color="primary.txtMain">{title}</Text>
    </VStack>
  )
}