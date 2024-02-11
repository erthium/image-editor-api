import { Injectable } from '@nestjs/common';
import { ImageEditDto } from 'src/dto/image-edit.dto';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class EditorService {

    async testConnection(): Promise<void> {
        return AiService.testKey();
    }

    async editImage(imageFile: File): Promise<string> {
        try{
            // convert file to base64 image
            const image = await imageFile.arrayBuffer().then(buffer => Buffer.from(buffer).toString('base64'));
            const editedImageUrl = await AiService.postImage(image);
            return editedImageUrl;
        }
        catch (error) {
            console.error('Image editing error:', error);
            throw new Error('Error editing image');
        }
    }
}
