import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { StorageService } from 'src/storage/storage.service';
import { IdentifierService } from 'src/identifier/identifier.service';

@Injectable()
export class EditorService {
    constructor(
        private readonly storageService: StorageService,
        private readonly identifierService: IdentifierService,
        private readonly aiService: AiService
    ) { }

    async testConnection(): Promise<void> {
        return this.aiService.testKey();
    }

    async editImage(imageFile: File, prompt: string): Promise<string> {
        // convert file to base64 image
        const image64 = await imageFile.arrayBuffer()
            .then(buffer => Buffer.from(buffer).toString('base64'));
        
        const apiResponse = await this.aiService.postImage(image64, prompt);
        
        // create an id for the image
        const imageID = await this.identifierService.createID(image64);

        // store the raw and edited images
        const editedImage64 = apiResponse.image;
        this.storageService.saveImage(image64, imageID + '-raw');
        this.storageService.saveImage(editedImage64, imageID + '-edited');
        
        // also send the image id to the client
        apiResponse.image_id = imageID;
        return apiResponse;
    }

    async getEditedImage(id: string): Promise<string> {
        return this.storageService.getImage(id, true);
    }
}
