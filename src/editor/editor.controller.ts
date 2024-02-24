import { Body, Controller, Get, Param, Post, UploadedFile } from '@nestjs/common';
import { EditorService } from './editor.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Data Transfer Object Blueprints
import { ImageEditDto } from 'src/dto/image-edit.dto';

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
    
    @Post('edit')
    @UseInterceptors(FileInterceptor('image'))
    async editImage(@UploadedFile() image: Express.Multer.File , @Body() data: ImageEditDto) {
        try {
            const promptData = {
                prompt: data.prompt,
                strength: data.strength,
                style_preset: data.style_preset
            };
            const apiResponse = await this.editorService.editImage(image, promptData);
            return apiResponse;
        } 
        catch (error) {
            console.error('Image editing error:', error);
            return { error: 'Error editing image' };
        }
    }
}
