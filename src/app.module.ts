import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiService } from './ai/ai.service';
import { EditorController } from './editor/editor.controller';
import { EditorService } from './editor/editor.service';

@Module({
  imports: [],
  controllers: [AppController, EditorController],
  providers: [AppService, AiService, EditorService],
})
export class AppModule {}
