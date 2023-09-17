"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const schemas_1 = require("../schemas");
const jwt_1 = require("../utils/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor() {
        this.login = async (username, password, context) => {
            const e = "Invalid username or password";
            const user = await schemas_1.UserModel.find().findByUsername(username).lean();
            if (!user) {
                console.log("NO USER");
                throw new apollo_server_core_1.ApolloError(e);
            }
            const passwordIsValid = await bcrypt_1.default.compare(password, user.password);
            if (!passwordIsValid) {
                throw new apollo_server_core_1.ApolloError(e);
            }
            const token = (0, jwt_1.signJwt)(user);
            return JSON.stringify({ accessToken: token, id: user._id });
        };
        this.createUser = async ({ username, name, password, email }) => {
            console.log("CREATING USER");
            return await schemas_1.UserModel.create({
                email,
                username,
                password,
                name
            });
        };
        this.fetchUser = async (id) => {
            return await schemas_1.UserModel.findById(id);
        };
        this.listUsers = async () => {
            return await schemas_1.UserModel.find();
        };
        this.listFollowings = async (id) => {
            let user = await schemas_1.UserModel.findById(id);
            return user === null || user === void 0 ? void 0 : user.followings;
        };
        this.updateUser = async ({ id, name, bio, pfp }) => {
            return await schemas_1.UserModel.findByIdAndUpdate(id, {
                ...(name && { name }),
                ...(bio && { bio }),
                ...(pfp && { pfp })
            }, { new: true });
        };
        this.addFollowing = async (userId, followerId) => {
            return await Promise.all([
                schemas_1.UserModel.findByIdAndUpdate(followerId, { $addToSet: { followers: userId } }, { new: true }),
                schemas_1.UserModel.findByIdAndUpdate(userId, { $addToSet: { followings: followerId } }, { new: true })
            ]).then((res) => {
                return [res[0], res[1]];
            });
        };
        this.removeFollowing = async (userId, followerId) => {
            return await Promise.all([
                schemas_1.UserModel.findByIdAndUpdate(followerId, { $pull: { followers: userId } }, { new: true }),
                schemas_1.UserModel.findByIdAndUpdate(userId, { $pull: { followings: followerId } }, { new: true })
            ]);
        };
    }
}
exports.default = UserService;
