import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AiService } from './ai/ai.service';
import { EditorController } from './editor/editor.controller';
import { EditorService } from './editor/editor.service';

@Module({
  imports: [],
  controllers: [AppController, EditorController],
  providers: [AiService, EditorService],
})
export class AppModule {}
