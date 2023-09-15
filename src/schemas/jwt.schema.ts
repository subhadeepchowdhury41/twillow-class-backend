import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { User } from './user.schema';

@ObjectType()
export class Jwt {
  @Field(() => String)
  token: string;

  @Field(() => User)
  @prop({ ref: () => User })
  user: Ref<User>;

  @Field(() => Date)
  expiryDate: Date;
}

export const JwtModel = getModelForClass<typeof Jwt>(Jwt);