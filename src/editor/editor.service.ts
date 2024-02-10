import { Injectable } from '@nestjs/common';
import { ImageEditDto } from 'src/dto/image-edit.dto';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class EditorService {

    async editImage(data: ImageEditDto): Promise<string> {
        try{
            const editedImageUrl = await AiService.modifyImage(data.image, data.prompt);
            return editedImageUrl;
        }
        catch (error) {
            console.error('Image editing error:', error);
            throw new Error('Error editing image');
        }
    }

}
