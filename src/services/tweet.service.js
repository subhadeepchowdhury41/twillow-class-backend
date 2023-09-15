"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
class TweetService {
    constructor() {
        this.listTweets = async () => {
            return await schemas_1.TweetModel.find();
        };
        this.createTweet = async (text, author, media) => {
            const tweet = new schemas_1.TweetModel({ text, author });
            media === null || media === void 0 ? void 0 : media.forEach((m) => tweet.media.push(m));
            return await tweet.save();
        };
        this.likeTweet = async (tweetId, userId) => {
            return await schemas_1.TweetModel.findByIdAndUpdate(tweetId, { $addToSet: { likes: userId } }, { new: true });
        };
        this.fetchTweet = async (id) => {
            return schemas_1.TweetModel.findById(id);
        };
    }
}
exports.default = TweetService;
