import { Image, IImageProps } from "native-base";

type UserPhoto = IImageProps & {
  sizes: number
}
export function UserPhoto({ sizes, ...rest }: UserPhoto) {
  return (
    <Image
      w={sizes}
      h={sizes}
      borderRadius={99}
      {...rest}
    />
  )
}