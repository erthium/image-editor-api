import { FileService } from 'src/file/file.service';
export declare class StorageService {
    private readonly fileService;
    constructor(fileService: FileService);
    test(): string;
    saveImage(image: string, id: string, type: 'raw' | 'edited'): Promise<void>;
    getImage(id: string, type: 'raw' | 'edited', framed: boolean): Promise<string>;
}
