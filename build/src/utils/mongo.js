"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const connectToDB = async () => {
    const dbUri = config_1.default.get("dbUri");
    await mongoose_1.default.connect(dbUri).then(() => {
        console.log("Connected to database successfully ✅ ✅ ✅");
    }).catch((err) => {
        console.error("Error connecting to database ❌ ❌ ❌", err);
    });
};
exports.connectToDB = connectToDB;
