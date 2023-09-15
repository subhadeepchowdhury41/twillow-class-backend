import { prop, pre, Ref, index, ReturnModelType, queryMethod } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, ObjectType, InputType, ID } from "type-graphql";
import * as bcrypt from "bcrypt";
import { Tweet } from "./tweet.schema";
import { Comment } from "./comment.schema";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";

export interface UserQueryHelpers {
  findByUsername: AsQueryMethod<typeof findByUsername>;
}

function findByUsername(
  this: ReturnModelType<typeof User, UserQueryHelpers>,
  username: User["username"]
) {
  return this.findOne({ username });
}

@pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
})
@queryMethod(findByUsername)
@index({ username: 1, email: 1 }, { unique: true })
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  username: string;

  @Field(() => String)
  @prop({ default: "" })
  name: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @prop({ required: true })
  password: string;

  @Field(() => String, { nullable: true })
  @prop({ default: "" })
  bio: string;

  @Field(() => String)
  @prop({ default: "https://i.imgur.com/HeIi0wU.png" })
  pfp: string

  @Field(() => [User], { nullable: true })
  @prop({ ref: User, default: [] })
  followings: Ref<User>[];

  @Field(() => [User], { nullable: true })
  @prop({ ref: () => User, default: [] })
  followers: Ref<User>[];

  @Field(() => [Tweet], { nullable: true })
  @prop({ ref: () => Tweet, default: [] })
  likedTweets: Ref<Tweet>[];

  @Field(() => [Comment])
  @prop({ ref: () => Comment, default: [] })
  likedComments: Ref<Comment>[];
}

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, {
    message: "Password must be at least 6 characters long"
  })
  @MaxLength(30, {
    message: "Password must be at most 30 characters long"
  })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class FollowUserInput {
  @Field(() => String)
  userId: typeof ID;

  @Field(() => String)
  followerId: typeof ID;
}

@InputType()
export class UnfollowUserInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  followerId: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  pfp?: string;
}