import { Query, Resolver, Mutation, Arg, ID, Ctx } from "type-graphql";
import { CreateUserInput, User } from "../schemas/user.schema";
import UserService from "../services/user.service";
import Context from "../types/context";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Query(() => User)
  fetchUser(@Arg('id', () => ID) id: string) {
    return this.userService.fetchUser(id);
  }

  @Mutation(() => String, { nullable: true })
  loginUser(
    @Arg('username', () => String) username: string,
    @Arg('password', () => String) password: string,
    @Ctx() context: Context
  ) {
    return this.userService.login(username, password, context);
  }

  @Query(() => [User])
  listUsers() {
    return this.userService.listUsers();
  }

  @Mutation(() => User)
  createUser(@Arg('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  updateUser(
    @Arg('name', () => String, {nullable: true}) name: string,
    @Arg('id', () => ID) id: string,
    @Arg('bio', () => String, { nullable: true }) bio: string,
    @Arg('pfp', () => String, { nullable: true }) pfp: string
  ) {
    return this.userService.updateUser({id: id, name: name, bio: bio, pfp: pfp});
  }

  @Mutation(() => [User])
  followUser(@Arg('userId', () => ID) userId: string, @Arg('followerId', () => ID) followerId: string) {
    return this.userService.addFollowing(userId, followerId);
  }

  @Mutation(() => [User])
  unfollowUser(@Arg('userId', () => ID) userId: string, @Arg('followerId', () => ID) followerId: string) {
    return this.userService.removeFollowing(userId, followerId);
  }
}