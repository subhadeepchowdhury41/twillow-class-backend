import dotenv from "dotenv";
dotenv.config();

export default {
  dbUri: "mongodb://127.0.0.1/twillow-class",
  jwtSecret: "secret_key",
  jwtExpiration: 36000,
  jwtRefreshExpiration: 72000,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};