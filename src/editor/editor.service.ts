import { Injectable } from '@nestjs/common';
import { ImageEditDto } from 'src/dto/image-edit.dto';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class EditorService {

    async testConnection(): Promise<void> {
        return AiService.testKey();
    }

    async editImage(data: ImageEditDto): Promise<string> {
        try{
            if (typeof data.image !== 'string') {
                throw new Error(`Invalid image input: ${data.image}`);
            }
            if (typeof data.prompt !== 'string') {
                throw new Error(`Invalid prompt input: ${data.prompt}`);
            }
            const editedImageUrl = await AiService.modifyImage(data.image, data.prompt);
            return editedImageUrl;
        }
        catch (error) {
            console.error('Image editing error:', error);
            throw new Error('Error editing image');
        }
    }

}
