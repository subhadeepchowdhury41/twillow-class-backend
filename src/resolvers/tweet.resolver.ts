import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import TweetService from "../services/tweet.service";
import { Tweet } from "../schemas/tweet.schema";
import { User } from "../schemas/user.schema";

@Resolver()
export default class TweetResolver {
  constructor(private tweetService: TweetService) {
    this.tweetService = new TweetService();
  }

  @Query(() => [Tweet])
  listTweets() {
    return this.tweetService.listTweets();
  }

  @Query(() => [Tweet])
  fetchTimelineTweets(
    @Arg("userId", () => ID) userId: string,
  ) {
    return this.tweetService.fetchTimelineTweets(userId);
  }

  @Mutation(() => Tweet)
  createTweet(
    @Arg("text", () => String) text: string,
    @Arg("author", () => ID) author: string,
    @Arg("media", () => [String], {nullable: true}) media: string[]
  ) {
    return this.tweetService.createTweet(text, author, media);
  }

  @Mutation(() => Tweet)
  likeTweet(
    @Arg("tweetId", () => ID) tweetId: string,
    @Arg("userId", () => ID) userId: string
  ) {
    return this.tweetService.likeTweet(tweetId, userId);
  }

  @Query(() => Tweet)
  fetchTweet(
    @Arg("id", () => ID) id: string
  ) {
    return this.tweetService.fetchTweet(id);
  }
}