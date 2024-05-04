/// <reference types="multer" />
import { EditorService } from './editor.service';
import { ImageEditDto } from 'src/dto/image-edit.dto';
export declare class EditorController {
    private readonly editorService;
    constructor(editorService: EditorService);
    testConnection(): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: string;
        message?: undefined;
    }>;
    editImage(image: Express.Multer.File, data: ImageEditDto): Promise<string | {
        error: string;
    }>;
}
