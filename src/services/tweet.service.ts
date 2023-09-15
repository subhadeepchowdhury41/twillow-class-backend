import { TweetModel } from "../schemas";

export default class TweetService {
  listTweets = async () => {
    return await TweetModel.find();
  }

  createTweet = async (text: string, author: string, media?: string[]) => {
    const tweet = new TweetModel({ text, author });
    media?.forEach((m) => tweet.media.push(m));
    return await tweet.save();
  }

  likeTweet = async (tweetId: string, userId: string) => {
    return await TweetModel.findByIdAndUpdate(tweetId, { $addToSet: { likes: userId } }, { new: true });
  }

  fetchTweet = async (id: string) => {
    return TweetModel.findById(id);
  }
}