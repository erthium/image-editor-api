import { Body, Controller, Post } from '@nestjs/common';
import { EditorService } from './editor.service';
import { ImageEditDto } from 'src/dto/image-edit.dto';

@Controller('editor')
export class EditorController {
    constructor(private readonly editorService: EditorService) { }

    @Post()
    async editImage(@Body() data: ImageEditDto) {
        try {
            const editedImageUrl = await this.editorService.editImage(data);
            return { editedImageUrl };
        } 
        catch (error) {
            console.error('Image editing error:', error);
            return { error: 'Error editing image' };
        }
    }
}
