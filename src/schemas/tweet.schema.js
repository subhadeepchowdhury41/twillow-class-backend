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
exports.LikeTweetInput = exports.UpdateTweetInput = exports.CreateTweetInput = exports.Tweet = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const user_schema_1 = require("./user.schema");
const comment_schema_1 = require("./comment.schema");
let Tweet = class Tweet {
};
exports.Tweet = Tweet;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Tweet.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Tweet.prototype, "media", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ default: "" }),
    __metadata("design:type", String)
], Tweet.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typegoose_1.prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Tweet.prototype, "dateTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [comment_schema_1.Comment]),
    (0, typegoose_1.prop)({ ref: () => comment_schema_1.Comment, default: [] }),
    __metadata("design:type", Array)
], Tweet.prototype, "comments", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [user_schema_1.User]),
    (0, typegoose_1.prop)({ ref: () => user_schema_1.User, default: [] }),
    __metadata("design:type", Array)
], Tweet.prototype, "likes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_schema_1.User),
    (0, typegoose_1.prop)({ ref: () => user_schema_1.User, required: true }),
    __metadata("design:type", Object)
], Tweet.prototype, "author", void 0);
exports.Tweet = Tweet = __decorate([
    (0, type_graphql_1.ObjectType)()
], Tweet);
let CreateTweetInput = class CreateTweetInput {
};
exports.CreateTweetInput = CreateTweetInput;
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateTweetInput.prototype, "media", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateTweetInput.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateTweetInput.prototype, "author", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateTweetInput.prototype, "description", void 0);
exports.CreateTweetInput = CreateTweetInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateTweetInput);
let UpdateTweetInput = class UpdateTweetInput {
};
exports.UpdateTweetInput = UpdateTweetInput;
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], UpdateTweetInput.prototype, "media", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdateTweetInput.prototype, "text", void 0);
exports.UpdateTweetInput = UpdateTweetInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateTweetInput);
let LikeTweetInput = class LikeTweetInput {
};
exports.LikeTweetInput = LikeTweetInput;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LikeTweetInput.prototype, "tweetId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LikeTweetInput.prototype, "userId", void 0);
exports.LikeTweetInput = LikeTweetInput = __decorate([
    (0, type_graphql_1.InputType)()
], LikeTweetInput);
