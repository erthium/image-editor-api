export declare class FirebaseService {
    private readonly bucket;
    constructor();
    getFilename(id: string, type: 'raw' | 'edited'): string;
    saveImage64(image64: string, id: string, type: 'raw' | 'edited'): Promise<void>;
    getImage64(id: string, type: 'raw' | 'edited'): Promise<string | null>;
}
