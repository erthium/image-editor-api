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
exports.EditorService = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../ai/ai.service");
const storage_service_1 = require("../storage/storage.service");
const identifier_service_1 = require("../identifier/identifier.service");
const sharp = require("sharp");
let EditorService = class EditorService {
    constructor(storageService, identifierService, aiService) {
        this.storageService = storageService;
        this.identifierService = identifierService;
        this.aiService = aiService;
    }
    async testConnection() {
        return this.aiService.testKey();
    }
    async editImage(imageFile, promptData) {
        const buffer = imageFile.buffer;
        const resizedImageBuffer = await sharp(buffer).resize(1024, 1024, {
            fit: 'cover'
        }).toBuffer();
        const image64 = resizedImageBuffer.toString('base64');
        const resizedImageFile = new File([resizedImageBuffer], imageFile.originalname, { type: imageFile.mimetype });
        const apiResponse = await this.aiService.postImage(resizedImageFile, promptData);
        const imageID = await this.identifierService.createID(image64);
        const editedImage64 = apiResponse.artifacts[0].base64;
        this.storageService.saveImage(image64, imageID, 'raw');
        this.storageService.saveImage(editedImage64, imageID, 'edited');
        apiResponse.image_id = imageID;
        return apiResponse;
    }
    async getEditedImage(id) {
        return this.storageService.getImage(id, 'edited');
    }
};
exports.EditorService = EditorService;
exports.EditorService = EditorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [storage_service_1.StorageService,
        identifier_service_1.IdentifierService,
        ai_service_1.AiService])
], EditorService);
//# sourceMappingURL=editor.service.js.map