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
exports.JwtModel = exports.Jwt = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const user_schema_1 = require("./user.schema");
let Jwt = class Jwt {
};
exports.Jwt = Jwt;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Jwt.prototype, "token", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_schema_1.User),
    (0, typegoose_1.prop)({ ref: () => user_schema_1.User }),
    __metadata("design:type", Object)
], Jwt.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Jwt.prototype, "expiryDate", void 0);
exports.Jwt = Jwt = __decorate([
    (0, type_graphql_1.ObjectType)()
], Jwt);
exports.JwtModel = (0, typegoose_1.getModelForClass)(Jwt);
