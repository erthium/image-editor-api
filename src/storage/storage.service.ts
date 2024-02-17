import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import * as fs from 'fs';
import * as path from 'path';

const STORAGE_DIR = path.join(__dirname, '../../storage');

@Injectable()
export class StorageService {
    constructor(private readonly firebaseService: FirebaseService) {}

    async saveImage(image: string, id: string, type: 'raw' | 'edited'): Promise<void> {
        //const filePath = path.join(STORAGE_DIR, `${id}.png`);
        //fs.writeFileSync(filePath, image, 'base64');
        await this.firebaseService.saveImage64(image, id, type);
    }

    async getImage(id: string, type: 'raw' | 'edited'): Promise<string> {
        /*
        const nameData = raw ? 'raw' : 'edited';
        const filePath = path.join(STORAGE_DIR, `${id}-${nameData}.png`);
        const image = fs.readFileSync(filePath, 'base64');
        return image;
        */
        return this.firebaseService.getImage64(id, type);
    }
}
