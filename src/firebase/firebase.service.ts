import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';


@Injectable()
export class FirebaseService {
    private readonly bucket: Bucket;

    constructor() {
        this.bucket = admin.storage().bucket();
    }

    getFilename(id: string, type: 'raw' | 'edited'): string {
        return `${id}-${type}.png`;
    }

    async saveImage64(image64: string, id: string, type: 'raw' | 'edited'): Promise<any> {
        console.log(id + '  ---  ' + type)
        const filename = this.getFilename(id, type);
        this.bucket.file(filename).save(image64, {
            metadata: {
                contentType: 'image/png'
            }
        });
    }

    async getImage64(id: string, type: 'raw' | 'edited'): Promise<string | null> {
        const filename = this.getFilename(id, type);
        const file = this.bucket.file(filename);
        const exists = await file.exists();
        if (!exists[0]) {
            return null;
        }
        const data = await file.download();
        return data[0].toString('base64');
    }
    
}
