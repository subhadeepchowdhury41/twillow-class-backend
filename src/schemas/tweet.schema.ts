import { prop, getModelForClass, Ref, queryMethod } from '@typegoose/typegoose';
import { ObjectType, Field, InputType } from 'type-graphql';
import { User } from './user.schema';
import { Comment } from './comment.schema';
import { AsQueryMethod, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from '.';

export interface TweetQueryHelpers {
  listAllTweetsByTime: AsQueryMethod<typeof listAllTweetsByTime>;
  fetchTimelineTweets: AsQueryMethod<typeof fetchTimelineTweets>;
}

function listAllTweetsByTime(
  this: ReturnModelType<typeof Tweet, TweetQueryHelpers>,) {
  return this.find().sort({ dateTime: -1 });
}

function fetchTimelineTweets(
  this: ReturnModelType<typeof Tweet, TweetQueryHelpers>,
  userId: string,
  followings: string[]
) {
  return this.find().where({
    'auhtor': { $in: followings }
  }).sort({ dateTime: -1 });
}

@ObjectType()
@queryMethod(listAllTweetsByTime)
@queryMethod(fetchTimelineTweets)  
export class Tweet {
  @Field(() => String)
  _id: string;

  @Field(() => [String])
  @prop({ default: [] })
  media: string[];

  @Field(() => String)
  @prop({ default: "" })
  text: string;

  @Field(() => Date)
  @prop({ default: Date.now })
  dateTime: Date;

  @Field(() => [Comment])
  @prop({ ref: () => Comment, default: [] })
  comments: Ref<Comment>[];

  @Field(() => [User])
  @prop({ ref: () => User, default: [] })
  likes: Ref<User>[];

  @Field(() => User)
  @prop({ ref: () => User, required: true })
  author: Ref<User>;
}

@InputType()
export class CreateTweetInput {
  @Field(() => [String!]!, { nullable: true })
  media?: string[];

  @Field(() => String)
  text: string;

  @Field(() => String)
  author: string;

  @Field(() => String)
  description: string;
}

@InputType()
export class UpdateTweetInput {
  @Field(() => [String])
  media: string[];

  @Field(() => String)
  text: string;
}

@InputType()
export class LikeTweetInput {
  @Field(() => String)
  tweetId: string;

  @Field(() => String)
  userId: string;
}