/// <reference types="multer" />
import { AiService } from 'src/ai/ai.service';
import { StorageService } from 'src/storage/storage.service';
import { IdentifierService } from 'src/identifier/identifier.service';
export declare class EditorService {
    private readonly storageService;
    private readonly identifierService;
    private readonly aiService;
    constructor(storageService: StorageService, identifierService: IdentifierService, aiService: AiService);
    testConnection(): Promise<void>;
    editImage(imageFile: Express.Multer.File, promptData: any): Promise<string>;
}
