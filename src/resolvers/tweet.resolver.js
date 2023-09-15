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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const tweet_service_1 = __importDefault(require("../services/tweet.service"));
const tweet_schema_1 = require("../schemas/tweet.schema");
let TweetResolver = class TweetResolver {
    constructor(tweetService) {
        this.tweetService = tweetService;
        this.tweetService = new tweet_service_1.default();
    }
    listTweets() {
        return this.tweetService.listTweets();
    }
    createTweet(text, author, media) {
        return this.tweetService.createTweet(text, author, media);
    }
    likeTweet(tweetId, userId) {
        return this.tweetService.likeTweet(tweetId, userId);
    }
    fetchTweet(id) {
        return this.tweetService.fetchTweet(id);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [tweet_schema_1.Tweet]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "listTweets", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => tweet_schema_1.Tweet),
    __param(0, (0, type_graphql_1.Arg)("text", () => String)),
    __param(1, (0, type_graphql_1.Arg)("author", () => type_graphql_1.ID)),
    __param(2, (0, type_graphql_1.Arg)("media", () => [String], { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "createTweet", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => tweet_schema_1.Tweet),
    __param(0, (0, type_graphql_1.Arg)("tweetId", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "likeTweet", null);
__decorate([
    (0, type_graphql_1.Query)(() => tweet_schema_1.Tweet),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "fetchTweet", null);
TweetResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [tweet_service_1.default])
], TweetResolver);
exports.default = TweetResolver;
