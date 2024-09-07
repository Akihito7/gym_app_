import { Image } from "native-base";
import ExerciseDetails from "../../assets/exerciseDetails.png"
export function PhotoExerciseDetails() {
  return (
    <Image
      source={ExerciseDetails}
      alt="Imagem do exercicio"
      maxHeight={500}
      width="full"
      style={{
        objectFit : "contain"
      }}
    />
  )
}