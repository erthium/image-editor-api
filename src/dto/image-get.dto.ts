import { ImageType } from "src/storage/image-type";

export class ImageGetDto {
  id: string
  type: ImageType
  edited: boolean | string
  framed: boolean | string
}
