import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { StorageService } from 'src/storage/storage.service';
import { IdentifierService } from 'src/identifier/identifier.service';

@Injectable()
export class EditorService {
    constructor(
        private readonly storageService: StorageService,
        private readonly identifierService: IdentifierService,
    ) { }

    async testConnection(): Promise<void> {
        return AiService.testKey();
    }

    async editImage(imageFile: File): Promise<string> {
        try{
            // convert file to base64 image
            const image64 = await imageFile.arrayBuffer()
                .then(buffer => Buffer.from(buffer).toString('base64'));
            const imageID = await this.identifierService.createID(image64);
            this.storageService.saveImage(image64, imageID + '-raw');
            const editedImageResponse = await AiService.postImage(image64);
            const editedImage64 = editedImageResponse.image;
            this.storageService.saveImage(editedImage64, imageID + '-edited');
            return editedImageResponse;
        }
        catch (error) {
            console.error('Image editing error:', error);
            throw new Error('Error editing image');
        }
    }

    async getEditedImage(id: string): Promise<string> {
        return this.storageService.getImage(id, true);
    }
}
