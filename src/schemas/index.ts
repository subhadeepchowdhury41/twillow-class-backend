import { getModelForClass } from "@typegoose/typegoose";
import { Comment } from "./comment.schema";
import { UserQueryHelpers, User } from "./user.schema";
import { Tweet } from "./tweet.schema";

export const CommentModel = getModelForClass<typeof Comment>(Comment);
export const TweetModel = getModelForClass<typeof Tweet>(Tweet);
export const UserModel = getModelForClass<typeof User, UserQueryHelpers>(User);