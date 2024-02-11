import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AiService } from './ai/ai.service';
import { EditorController } from './editor/editor.controller';
import { EditorService } from './editor/editor.service';
import { OpenaiService } from './openai/openai.service';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: '.env',
    })],
    controllers: [AppController, EditorController],
    providers: [AiService, EditorService, OpenaiService],
})
export class AppModule {}
