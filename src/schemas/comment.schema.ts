import { prop, Ref, index, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { User } from './user.schema';
import { Tweet } from './tweet.schema';

@ObjectType()
@index({ author: 1, })
export class Comment {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ default: "" })
  text: string;

  @Field(() => Date)
  @prop({ default: Date.now })
  dateTime: Date;

  @Field(() => String)
  @prop({ ref: () => Tweet, required: true })
  tweetId: string;

  @Field(() => [User])
  @prop({ ref: () => User, default: [] })
  likes: Ref<User>[];

  @Field(() => String)
  @prop({ ref: () => User, required: true })
  author: Ref<User>;
}

export class CreateCommentInput {
  @Field(() => String)
  text: string;

  @Field(() => String)
  author: string;

  @Field(() => String)
  tweetId: string;
}