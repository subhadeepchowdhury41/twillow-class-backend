import { ApolloError } from "apollo-server-core";
import { UserModel } from "../schemas";
import { CreateUserInput } from "../schemas/user.schema";
import Context from "../types/context";
import { signJwt } from "../utils/jwt";
import bcrypt from "bcrypt";

export default class UserService {
  login = async (username: string, password: string, context: Context) => {
    const e = "Invalid username or password";
    const user = await UserModel.find().findByUsername(username).lean();
    if (!user) {
      console.log("NO USER");
      
      throw new ApolloError(e);
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new ApolloError(e);
    }
    const token = signJwt(user);
    return JSON.stringify({accessToken: token, id: user._id});
  }
  createUser = async ({
    username, name, password, email
  } : {
    username: string,
    name: string,
    password: string,
    email: string
    }) => {
    console.log("CREATING USER");
    
    return await UserModel.create({
      email,
      username,
      password,
      name
    });
  }
  fetchUser = async (id: string) => {
    return await UserModel.findById(id);
  }
  listUsers = async () => {
    return await UserModel.find();
  }
  listFollowings = async (id: string) => {
    let user = await UserModel.findById(id);
    return user?.followings;
  }
  updateUser = async ({
    id, name, bio, pfp
  }: {
    id: string,
    name?: string,
    bio?: string,
    pfp?: string
  }) => {
    return await UserModel.findByIdAndUpdate(id, {
      ...(name && { name }),
      ...(bio && { bio }),
      ...(pfp && { pfp })
    }, { new: true });
  }
  addFollowing = async (userId: string, followerId: string) => {
    return await Promise.all([
      UserModel.findByIdAndUpdate(followerId, { $addToSet: { followers: userId } }, { new: true }),
      UserModel.findByIdAndUpdate(userId, { $addToSet: { followings: followerId } }, { new: true })
    ]).then((res) => {
      return [res[0], res[1]];
    });
  }
  removeFollowing = async (userId: string, followerId: string) => {
    return await Promise.all([
      UserModel.findByIdAndUpdate(followerId, { $pull: { followers: userId } }, { new: true }),
      UserModel.findByIdAndUpdate(userId, { $pull: { followings: followerId } }, { new: true })
    ]);
  }
}