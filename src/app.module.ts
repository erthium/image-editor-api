import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AiService } from './ai/ai.service';
import { EditorController } from './editor/editor.controller';
import { EditorService } from './editor/editor.service';
import { StorageService } from './storage/storage.service';
import { IdentifierService } from './identifier/identifier.service';
import { FirebaseService } from './firebase/firebase.service';

import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://ai-summit-image-edit.appspot.com"
});

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: '.env',
    })],
    controllers: [AppController, EditorController],
    providers: [
        AiService, 
        EditorService, 
        StorageService, 
        IdentifierService, 
        FirebaseService
    ],
})
export class AppModule {}
