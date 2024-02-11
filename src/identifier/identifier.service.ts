import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class IdentifierService {
    async createID(image64: string): Promise<string> {
        // create a random id for the image from the base64 string
        // it should be 10 characters long
        const hash = crypto.createHash('sha256');
        hash.update(image64);
        const id = hash.digest('hex').slice(0, 10);
        return id;
    }
}
