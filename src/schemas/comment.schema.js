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
exports.CreateCommentInput = exports.Comment = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const user_schema_1 = require("./user.schema");
const tweet_schema_1 = require("./tweet.schema");
let Comment = class Comment {
};
exports.Comment = Comment;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Comment.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ default: "" }),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typegoose_1.prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Comment.prototype, "dateTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ ref: () => tweet_schema_1.Tweet, required: true }),
    __metadata("design:type", String)
], Comment.prototype, "tweetId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [user_schema_1.User]),
    (0, typegoose_1.prop)({ ref: () => user_schema_1.User, default: [] }),
    __metadata("design:type", Array)
], Comment.prototype, "likes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ ref: () => user_schema_1.User, required: true }),
    __metadata("design:type", Object)
], Comment.prototype, "author", void 0);
exports.Comment = Comment = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typegoose_1.index)({ author: 1, })
], Comment);
class CreateCommentInput {
}
exports.CreateCommentInput = CreateCommentInput;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateCommentInput.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateCommentInput.prototype, "author", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateCommentInput.prototype, "tweetId", void 0);
