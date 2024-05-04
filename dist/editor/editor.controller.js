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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorController = void 0;
const common_1 = require("@nestjs/common");
const editor_service_1 = require("./editor.service");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const image_edit_dto_1 = require("../dto/image-edit.dto");
let EditorController = class EditorController {
    constructor(editorService) {
        this.editorService = editorService;
    }
    async testConnection() {
        try {
            await this.editorService.testConnection();
            return { message: 'Connection successful' };
        }
        catch (error) {
            console.error('Connection error:', error);
            return { error: 'Connection error' };
        }
    }
    async editImage(image, data) {
        try {
            const promptData = {
                prompt: data.prompt,
                strength: data.strength,
                style_preset: data.style_preset
            };
            const apiResponse = await this.editorService.editImage(image, promptData);
            return apiResponse;
        }
        catch (error) {
            console.error('Image editing error:', error);
            return { error: 'Error editing image' };
        }
    }
};
exports.EditorController = EditorController;
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EditorController.prototype, "testConnection", null);
__decorate([
    (0, common_1.Post)('edit'),
    (0, common_2.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, image_edit_dto_1.ImageEditDto]),
    __metadata("design:returntype", Promise)
], EditorController.prototype, "editImage", null);
exports.EditorController = EditorController = __decorate([
    (0, common_1.Controller)('editor'),
    __metadata("design:paramtypes", [editor_service_1.EditorService])
], EditorController);
//# sourceMappingURL=editor.controller.js.map