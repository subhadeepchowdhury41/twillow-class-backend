"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserInput = exports.UnfollowUserInput = exports.FollowUserInput = exports.LoginUserInput = exports.CreateUserInput = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const bcrypt = __importStar(require("bcrypt"));
const tweet_schema_1 = require("./tweet.schema");
const comment_schema_1 = require("./comment.schema");
function fetchFollowings(userId) {
    return this.findById(userId).populate("followings", [
        '_id', 'username', 'name', 'pfp'
    ]);
}
function fetchFollowers(userId) {
    return this.findById(userId).populate("followers", [
        '_id', 'username', 'name', 'pfp'
    ]);
}
function findByUsername(username) {
    return this.findOne({ username });
}
let User = class User {
};
exports.User = User;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.prop)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ default: "https://i.imgur.com/HeIi0wU.png" }),
    __metadata("design:type", String)
], User.prototype, "pfp", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User], { nullable: true }),
    (0, typegoose_1.prop)({ ref: User, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "followings", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User], { nullable: true }),
    (0, typegoose_1.prop)({ ref: () => User, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [tweet_schema_1.Tweet], { nullable: true }),
    (0, typegoose_1.prop)({ ref: () => tweet_schema_1.Tweet, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "likedTweets", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [comment_schema_1.Comment]),
    (0, typegoose_1.prop)({ ref: () => comment_schema_1.Comment, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "likedComments", void 0);
exports.User = User = __decorate([
    (0, typegoose_1.pre)("save", async function (next) {
        if (!this.isModified("password")) {
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }),
    (0, typegoose_1.queryMethod)(fetchFollowings),
    (0, typegoose_1.queryMethod)(fetchFollowers),
    (0, typegoose_1.queryMethod)(findByUsername),
    (0, typegoose_1.index)({ username: 1, email: 1 }, { unique: true }),
    (0, type_graphql_1.ObjectType)()
], User);
let CreateUserInput = class CreateUserInput {
};
exports.CreateUserInput = CreateUserInput;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6, {
        message: "Password must be at least 6 characters long"
    }),
    (0, class_validator_1.MaxLength)(30, {
        message: "Password must be at most 30 characters long"
    }),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
exports.CreateUserInput = CreateUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateUserInput);
let LoginUserInput = class LoginUserInput {
};
exports.LoginUserInput = LoginUserInput;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoginUserInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoginUserInput.prototype, "password", void 0);
exports.LoginUserInput = LoginUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginUserInput);
let FollowUserInput = class FollowUserInput {
};
exports.FollowUserInput = FollowUserInput;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Object)
], FollowUserInput.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Object)
], FollowUserInput.prototype, "followerId", void 0);
exports.FollowUserInput = FollowUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], FollowUserInput);
let UnfollowUserInput = class UnfollowUserInput {
};
exports.UnfollowUserInput = UnfollowUserInput;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UnfollowUserInput.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UnfollowUserInput.prototype, "followerId", void 0);
exports.UnfollowUserInput = UnfollowUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UnfollowUserInput);
let UpdateUserInput = class UpdateUserInput {
};
exports.UpdateUserInput = UpdateUserInput;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "bio", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "pfp", void 0);
exports.UpdateUserInput = UpdateUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateUserInput);
