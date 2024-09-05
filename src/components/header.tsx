import { HStack, Text, useTheme } from "native-base";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function Header() {
    const { colors } = useTheme();
    return (
        <HStack pt={12} pb={6} px={4} justifyContent="space-between" alignItems="center" bg="primary.bgComponents">
            <MaterialIcons name="menu" size={40} color={colors.primary.txtMain}/>
            <HStack flex={1} justifyContent="center" alignItems="center">
                <Text color="primary.txtMain" textAlign="center" fontSize={24}>Workout</Text>
            </HStack>
        </HStack>
    )
}