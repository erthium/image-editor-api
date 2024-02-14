import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { StorageService } from 'src/storage/storage.service';
import { IdentifierService } from 'src/identifier/identifier.service';
import * as sharp from 'sharp';

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
        /*
        // convert file to base64 image
        const image64 = await imageFile.arrayBuffer()
        .then(buffer => Buffer.from(buffer).toString('base64'));
        */
        
        // resize file to be 1024x1024
        const buffer = imageFile.buffer;

        // Resize the image while preserving aspect ratio
        const resizedImageBuffer = await sharp(buffer).resize(1024, 1024, {
            fit: 'contain',
            // withoutEnlargement: true,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          }).toBuffer();
        const image64 = resizedImageBuffer.toString('base64');
        // resizedImageBuffer to 'File'
        const resizedImageFile = new File([resizedImageBuffer], imageFile.originalname, { type: imageFile.mimetype });
        console.log(promptData);
        const apiResponse = await this.aiService.postImage(resizedImageFile, promptData);
        console.log('----------------------------------------------');
        console.log('API Response:', apiResponse);
        // create an id for the image
        const imageID = await this.identifierService.createID(image64);

        // store the raw and edited images
        const editedImage64 = apiResponse.artifacts[0].base64;
        this.storageService.saveImage(image64, imageID + '-raw');
        this.storageService.saveImage(editedImage64, imageID + '-edited');
        
        // also send the image id to the client
        apiResponse.image_id = imageID;
        return apiResponse;
    }
}
