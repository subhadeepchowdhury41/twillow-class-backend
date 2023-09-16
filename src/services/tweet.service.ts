import { TweetModel, UserModel } from "../schemas";


export default class TweetService {
  listTweets = async () => {
    return await TweetModel.find().listAllTweetsByTime();
  }

  fetchTimelineTweets = async (userId: string) => {
    let followings = await UserModel.findById(userId).fetchFollowers(userId);
    let followingsIds = followings?.followings.map((f: any) => f._id);
    console.log(followingsIds);
    return await TweetModel.find().fetchTimelineTweets(userId, followingsIds ?? []);
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