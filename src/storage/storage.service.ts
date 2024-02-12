import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const STORAGE_DIR = path.join(__dirname, '../../storage');

@Injectable()
export class StorageService {
    async saveImage(image: string, id: string): Promise<void> {
        const filePath = path.join(STORAGE_DIR, `${id}.png`);
        fs.writeFileSync(filePath, image, 'base64');
    }

    async getImage(id: string, raw: boolean = false): Promise<string> {
        const nameData = raw ? '-raw' : '-edited';
        const filePath = path.join(STORAGE_DIR, `${id}${nameData}.png`);
        const image = fs.readFileSync(filePath, 'base64');
        return image;
    }
}
