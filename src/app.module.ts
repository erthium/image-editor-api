import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiService } from './ai/ai.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AiService],
})
export class AppModule {}
