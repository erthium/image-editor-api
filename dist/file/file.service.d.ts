export declare class FileService {
    getFilename(id: string, type: 'raw' | 'edited'): string;
    getFilePath(filename: string): string;
    saveImage64(image64: string, id: string, type: 'raw' | 'edited'): Promise<void>;
    getImage64(id: string, type: 'raw' | 'edited'): Promise<string | null>;
}
