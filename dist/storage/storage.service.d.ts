import { FirebaseService } from 'src/firebase/firebase.service';
export declare class StorageService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    saveImage(image: string, id: string, type: 'raw' | 'edited'): Promise<void>;
    getImage(id: string, type: 'raw' | 'edited', framed: boolean): Promise<string>;
}
