"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let FileService = class FileService {
    getFilename(id, type) {
        return `${id}-${type}.png`;
    }
    getFilePath(filename) {
        return path.join(__dirname, '../../files', filename);
    }
    async saveImage64(image64, id, type) {
        const filename = this.getFilename(id, type);
        const image = Buffer.from(image64, 'base64');
        fs.writeFileSync(this.getFilePath(filename), image);
    }
    async getImage64(id, type) {
        const filename = this.getFilename(id, type);
        try {
            const image = fs.readFileSync(this.getFilePath(filename));
            return image.toString('base64');
        }
        catch (error) {
            return null;
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map