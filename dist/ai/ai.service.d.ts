/// <reference types="node" />
import { File } from 'buffer';
export declare class AiService {
    testKey(): Promise<void>;
    postImage(image64: File, promptData: any): Promise<any>;
}
