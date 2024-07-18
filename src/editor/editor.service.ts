import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { StorageService } from 'src/storage/storage.service';
import { IdentifierService } from 'src/identifier/identifier.service';
import * as sharp from 'sharp';
import { File } from 'buffer';

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

    async editImage(imageFile: Express.Multer.File, promptData: any): Promise<string> {
        // resize file to be 1024x1024
        const buffer = imageFile.buffer;

        // Resize the image while preserving aspect ratio
        const resizedImageBuffer = await sharp(buffer).resize(1024, 1024, {
            fit: 'cover'
            // withoutEnlargement: true,
          }).toBuffer();
        const image64 = resizedImageBuffer.toString('base64');
        // resizedImageBuffer to 'File'
        const resizedImageFile = new File([resizedImageBuffer], imageFile.originalname, { type: imageFile.mimetype });
        const apiResponse = await this.aiService.postImage(resizedImageFile, promptData);
        // create an id for the image
        console.log(apiResponse);
        const imageID = await this.identifierService.createID(image64);

        // store the raw and edited images
        const editedImage64 = apiResponse.artifacts[0].base64;
        this.storageService.saveImage(image64, imageID, false);
        this.storageService.saveImage(editedImage64, imageID, true);
        
        // also send the image id to the client
        apiResponse.image_id = imageID;
        return apiResponse;
    }
}
