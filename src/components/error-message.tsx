import { Text } from "native-base";

export function ErrorMessage({ message } : {message : string}){
  return (
    <Text mt={2} fontSize={14} color="red.500">{message}</Text>
  )
}