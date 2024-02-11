import { Body, Controller, Get, Post, UploadedFile } from '@nestjs/common';
import { EditorService } from './editor.service';
import { ImageEditDto } from 'src/dto/image-edit.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('editor')
export class EditorController {
    constructor(private readonly editorService: EditorService) { }

    @Get('test')
    async testConnection() {
        try {
            await this.editorService.testConnection();
            return { message: 'Connection successful' };
        }
        catch (error) {
            console.error('Connection error:', error);
            return { error: 'Connection error' };
        }
    }
    /*
    @Post('edit')
    async editImage(@Body() data: any) {
        try {
            const editedImageUrl = await this.editorService.editImage(data.image);
            return editedImageUrl;
        }
        catch (error) {
            console.error('Image editing error:', error);
            return { error: 'Error editing image' };
        }
    }
    */
    
    
    @Post('edit')
    @UseInterceptors(FileInterceptor('image'))
    async editImage(@UploadedFile() image , @Body() data: ImageEditDto) {
        try {
            const imageFile: File = new File([image.buffer], image.originalname, { type: image.mimetype });
            const editedImageUrl = await this.editorService.editImage(imageFile);
            return editedImageUrl;
        } 
        catch (error) {
            console.error('Image editing error:', error);
            return { error: 'Error editing image' };
        }
    }
    
}
