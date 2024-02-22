"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const sharp = require("sharp");
const firebase_service_1 = require("../firebase/firebase.service");
let StorageService = class StorageService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async saveImage(image, id, type) {
        await this.firebaseService.saveImage64(image, id, type);
    }
    async getImage(id, type, framed) {
        const image64 = await this.firebaseService.getImage64(id, type);
        if (framed) {
            const image_buf = Buffer.from(image64, 'base64');
            const frame_path = (0, path_1.join)(__dirname, '../assets/frame.png');
            const frame_logo_path = (0, path_1.join)(__dirname, '../assets/frame_logo.png');
            const frame = sharp(frame_path);
            const frame_logo = await sharp(frame_logo_path).toBuffer();
            const result_buf = await frame.composite([
                { input: image_buf, top: 30, left: 28 },
                { input: frame_logo }
            ]).toBuffer();
            return result_buf.toString('base64');
        }
        else {
            return image64;
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], StorageService);
//# sourceMappingURL=storage.service.js.map