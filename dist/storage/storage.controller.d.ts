import { StorageService } from './storage.service';
import { ImageGetDto } from 'src/dto/image-get.dto';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    getEditedImage(params: ImageGetDto): Promise<string | {
        error: string;
    }>;
}
