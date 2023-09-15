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

  @Mutation(() => Tweet)
  createTweet(
    @Arg("text", () => String) text: string,
    @Arg("author", () => ID) author: string,
    @Arg("media", () => [String], {nullable: true}) media: string[]
  ) {
    return this.tweetService.createTweet(text, author, media);
  }
}