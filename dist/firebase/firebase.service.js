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
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let FirebaseService = class FirebaseService {
    constructor() {
        this.bucket = admin.storage().bucket();
    }
    getFilename(id, type) {
        return `${id}-${type}.png`;
    }
    async saveImage64(image64, id, type) {
        const filename = this.getFilename(id, type);
        const image = Buffer.from(image64, 'base64');
        this.bucket.file(filename).save(image, {
            metadata: {
                contentType: 'image/png'
            }
        });
    }
    async getImage64(id, type) {
        const filename = this.getFilename(id, type);
        const file = this.bucket.file(filename);
        const exists = await file.exists();
        if (!exists[0]) {
            return null;
        }
        const data = await file.download();
        return data[0].toString('base64');
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map