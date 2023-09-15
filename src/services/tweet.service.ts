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
}