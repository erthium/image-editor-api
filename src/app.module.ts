import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AiService } from './ai/ai.service';
import { EditorController } from './editor/editor.controller';
import { EditorService } from './editor/editor.service';
import { StorageService } from './storage/storage.service';
import { IdentifierService } from './identifier/identifier.service';
import { FirebaseService } from './firebase/firebase.service';
import { StorageController } from './storage/storage.controller';
import { TuringController } from './turing/turing.controller';
import { TuringService } from './turing/turing.service';
import { OpenaiService } from './openai/openai.service';
import { GeminiService } from './gemini/gemini.service';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [
        AppController,
        EditorController,
        StorageController,
        TuringController],
    providers: [
        AiService, 
        EditorService, 
        StorageService, 
        IdentifierService, 
        FirebaseService, TuringService, OpenaiService, GeminiService
    ],
})
export class AppModule {}

import * as admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY as string);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
});
