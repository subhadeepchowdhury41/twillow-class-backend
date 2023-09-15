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
const user_schema_1 = require("../schemas/user.schema");
const user_service_1 = __importDefault(require("../services/user.service"));
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
        this.userService = new user_service_1.default();
    }
    fetchUser(id) {
        return this.userService.fetchUser(id);
    }
    loginUser(username, password, context) {
        return this.userService.login(username, password, context);
    }
    listUsers() {
        return this.userService.listUsers();
    }
    createUser(username, name, password, email) {
        return this.userService.createUser({ name, username, password, email });
    }
    updateUser(name, id, bio, pfp) {
        return this.userService.updateUser({ id: id, name: name, bio: bio, pfp: pfp });
    }
    followUser(userId, followerId) {
        return this.userService.addFollowing(userId, followerId);
    }
    unfollowUser(userId, followerId) {
        return this.userService.removeFollowing(userId, followerId);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => user_schema_1.User),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "fetchUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('username', () => String)),
    __param(1, (0, type_graphql_1.Arg)('password', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "loginUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => [user_schema_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "listUsers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_schema_1.User),
    __param(0, (0, type_graphql_1.Arg)('username', () => String)),
    __param(1, (0, type_graphql_1.Arg)('name', () => String)),
    __param(2, (0, type_graphql_1.Arg)('password', () => String)),
    __param(3, (0, type_graphql_1.Arg)('email', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_schema_1.User),
    __param(0, (0, type_graphql_1.Arg)('name', () => String, { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __param(2, (0, type_graphql_1.Arg)('bio', () => String, { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('pfp', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => [user_schema_1.User]),
    __param(0, (0, type_graphql_1.Arg)('userId', () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)('followerId', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "followUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => [user_schema_1.User]),
    __param(0, (0, type_graphql_1.Arg)('userId', () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)('followerId', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "unfollowUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.default])
], UserResolver);
exports.default = UserResolver;
