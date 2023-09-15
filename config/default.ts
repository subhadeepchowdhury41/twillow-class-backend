import dotenv from "dotenv";
dotenv.config();

export default {
  dbUri: "mongodb+srv://subha:subha41@cluster0.nejigio.mongodb.net/?retryWrites=true&w=majority",
  jwtSecret: "secret_key",
  jwtExpiration: 36000,
  jwtRefreshExpiration: 72000,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

export const cloudinaryConfig = {
  cloud_name: 'dhyniitpc',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}