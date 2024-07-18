import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';
import { ImageType } from 'src/storage/image-type';


@Injectable()
export class FirebaseService {
  private readonly bucket: Bucket;

  constructor() {
    this.bucket = admin.storage().bucket();
  }

  getFilename(id: string, isEdited: boolean): string {
    let suffix: string;
    if (isEdited)
      suffix = 'edited';
    else
      suffix = 'raw';

    return `${id}-${suffix}.png`;
  }

  async saveImage64(image64: string, id: string, isEdited: boolean): Promise<void> {
    const filename = this.getFilename(id, isEdited);
    const image = Buffer.from(image64, 'base64');
    this.bucket.file(filename).save(image, {
      metadata: {
        contentType: 'image/png'
      }
    });
  }

  async getImage64(id: string, isEdited: boolean): Promise<string | null> {
    const filename = this.getFilename(id, isEdited);
    const file = this.bucket.file(filename);
    const exists = await file.exists();
    if (!exists[0]) {
      return null;
    }
    const data = await file.download();
    return data[0].toString('base64');
  }

}
