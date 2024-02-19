import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class StorageService {
    constructor(private readonly firebaseService: FirebaseService) {}

    async saveImage(image: string, id: string, type: 'raw' | 'edited'): Promise<void> {
        await this.firebaseService.saveImage64(image, id, type);
    }

    async getImage(id: string, type: 'raw' | 'edited'): Promise<string> {
        return this.firebaseService.getImage64(id, type);
    }
}
