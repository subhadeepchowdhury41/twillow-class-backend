"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    dbUri: "mongodb+srv://subha:subha41@cluster0.nejigio.mongodb.net/?retryWrites=true&w=majority",
    jwtSecret: "secret_key",
    jwtExpiration: 36000,
    jwtRefreshExpiration: 72000,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
};
exports.cloudinaryConfig = {
    cloud_name: 'dhyniitpc',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};
