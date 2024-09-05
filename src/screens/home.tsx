import { VStack } from "native-base";
import { Header } from "../components/header";

export function Home(){
    return (
        <VStack flex={1} bg="primary.bg">   
            <Header />
        </VStack>
    )
}