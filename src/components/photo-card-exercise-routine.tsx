import { Image } from "native-base";
import ExerciseDetails from "../../assets/exerciseDetails.png"

export function PhotoCardRoutineExercise() {
  return (
    <Image
      source={ExerciseDetails}
      width={60}
      height={60}
      alt="Imagem do exercicio"
      borderRadius={10}
    />
  )
}