import { Controller, Get, Param } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ImageGetDto } from 'src/dto/image-get.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('get/:id/:type/:edited/:framed')
  async getImage(@Param() params: ImageGetDto) {
    const imageId = params.id;
    const imageType = params.type;
    const isEdited = params.edited === 'true';
    const isFramed = params.framed === 'true';
    try {
      return await this.storageService.getImage(imageId, imageType, isEdited, isFramed);
    }
    catch(error) {
        console.error(`Error getting image with id: ${imageId}`, error)
        return {  error: `Error getting image with id: ${imageId}` }
    }
  }
}
