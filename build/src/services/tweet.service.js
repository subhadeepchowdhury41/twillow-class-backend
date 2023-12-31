"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
class TweetService {
    constructor() {
        this.listTweets = async () => {
            return await schemas_1.TweetModel.find().listAllTweetsByTime();
        };
        this.fetchTimelineTweets = async (userId) => {
            let followings = await schemas_1.UserModel.findById(userId).fetchFollowers(userId);
            let followingsIds = followings === null || followings === void 0 ? void 0 : followings.followings.map((f) => f._id);
            console.log(followingsIds);
            return await schemas_1.TweetModel.find().fetchTimelineTweets(userId, followingsIds !== null && followingsIds !== void 0 ? followingsIds : []);
        };
        this.createTweet = async (text, author, media) => {
            const tweet = new schemas_1.TweetModel({ text, author });
            media === null || media === void 0 ? void 0 : media.forEach((m) => tweet.media.push(m));
            return await tweet.save();
        };
        this.updateTweet = async (id, text, media) => {
            return await schemas_1.TweetModel.findByIdAndUpdate(id, { text, media }, { new: true });
        };
        this.likeTweet = async (tweetId, userId) => {
            return await schemas_1.TweetModel.findByIdAndUpdate(tweetId, { $addToSet: { likes: userId } }, { new: true });
        };
        this.unlikeTweet = async (tweetId, userId) => {
            return await schemas_1.TweetModel.findByIdAndUpdate(tweetId, { $pull: { likes: userId } }, { new: true });
        };
        this.listLikes = async (id) => {
            var _a;
            return (_a = (await schemas_1.TweetModel.findById(id))) === null || _a === void 0 ? void 0 : _a.likes;
        };
        this.fetchTweet = async (id) => {
            return schemas_1.TweetModel.findById(id);
        };
    }
}
exports.default = TweetService;
