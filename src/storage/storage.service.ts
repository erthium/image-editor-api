import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as sharp from 'sharp';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ImageType } from './image-type';

@Injectable()
export class StorageService {
    constructor(private readonly firebaseService: FirebaseService) {}

    async saveImage(image: string, id: string, isEdited: boolean): Promise<void> {
        await this.firebaseService.saveImage64(image, id, isEdited);
    }

    async getImage(id: string, type: ImageType, isEdited: boolean, framed: boolean): Promise<string> {
      const image64 = await this.firebaseService.getImage64(id, isEdited);
      if (framed) {
        // Load images
        const image_buf = Buffer.from(image64, 'base64');

        // resize image to be 1024x1024
        const resizedImageBuffer = await sharp(image_buf).resize(1048, 1048, {
          fit: 'cover'
        }).toBuffer();

        let frame_type_name: string;
        switch (type) {
          case ImageType.StarWars:
            frame_type_name = 'sw-frame'
            break;
          case ImageType.Summit24:
            frame_type_name = 'summit-frame'
            break;
        }
        const frame_path = join(__dirname, `../assets/${frame_type_name}.png`);
        const frame_logo_path = join(__dirname, '../assets/frame_logo.png');
        const frame = sharp(frame_path);
        const frame_buffer = await frame.toBuffer();
        const frame_logo = await sharp(frame_logo_path).toBuffer();

        // Compose
        // resized image needs to be on the bottom layer, frame and logo would be on the top
        // result should be the same type as the image
        const result_buf = await frame.composite([
          { input: resizedImageBuffer, top: 20, left: 18},
          { input: frame_buffer},
          { input: frame_logo }
        ]).toBuffer();

        // Return final image as base64
        return result_buf.toString('base64');
      } else {
        return image64;
      }
    }
}
