import config from "config";
import Uuid from "uuid";
import { Jwt, JwtModel } from "../schemas/jwt.schema";
import { User } from "../schemas/user.schema";

export default class JwtService {
  createToken = async (user: User) => {
    let expiredAt = new Date();

    expiredAt.setSeconds(
      expiredAt.getSeconds() + (config.get('jwtExpiration') as number)
    );

    let _token = Uuid.v4();

    let _object = new JwtModel({
      token: _token,
      user: user._id,
      expiryDate: expiredAt.getTime(),
    });

    let refreshToken = await _object.save();

    return refreshToken.token;
  };

  verifyExpiration = (token: Jwt) => {
    return token.expiryDate.getTime() < new Date().getTime();
  }
}