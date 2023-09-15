"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const uuid_1 = __importDefault(require("uuid"));
const jwt_schema_1 = require("../schemas/jwt.schema");
class JwtService {
    constructor() {
        this.createToken = async (user) => {
            let expiredAt = new Date();
            expiredAt.setSeconds(expiredAt.getSeconds() + config_1.default.get('jwtExpiration'));
            let _token = uuid_1.default.v4();
            let _object = new jwt_schema_1.JwtModel({
                token: _token,
                user: user._id,
                expiryDate: expiredAt.getTime(),
            });
            let refreshToken = await _object.save();
            return refreshToken.token;
        };
        this.verifyExpiration = (token) => {
            return token.expiryDate.getTime() < new Date().getTime();
        };
    }
}
exports.default = JwtService;
