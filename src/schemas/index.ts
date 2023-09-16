import { getModelForClass } from "@typegoose/typegoose";
import { Comment } from "./comment.schema";
import { UserQueryHelpers, User } from "./user.schema";
import { Tweet, TweetQueryHelpers } from "./tweet.schema";

export const CommentModel = getModelForClass<typeof Comment>(Comment);
export const TweetModel = getModelForClass<typeof Tweet, TweetQueryHelpers>(Tweet);
export const UserModel = getModelForClass<typeof User, UserQueryHelpers>(User);