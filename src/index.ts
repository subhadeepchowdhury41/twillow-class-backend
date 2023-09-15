import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, RequestHandler } from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { resolvers } from './resolvers';
import { connectToDB } from './utils/mongo';
import authChecker from './utils/authChecker';
import { verifyJwt } from './utils/jwt';
import { User } from './schemas/user.schema';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from '../config/default';
import multer from 'multer';
import streamifier from 'streamifier';

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: resolvers,
    authChecker: authChecker
  });
  const app = express();
  cloudinary.config(cloudinaryConfig);
  const upload = multer({ storage: multer.memoryStorage() });
  app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
      console.error('File upload failed');
      return res.status(400).send('File upload failed.');
    }
    try {
      let folder;
      if (req.file.mimetype.startsWith('image')) folder = 'images'
      else if (req.file.mimetype.startsWith('video')) folder = 'videos'
      else folder = 'files';

      const result = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: folder },
        (error, result) => {
          if (error) {
            console.error('Error uploading to Cloudinary:', error);
            return res.status(500).send('Error uploading to Cloudinary.');
          }
          return res.json({url: result!.secure_url, type: result!.resource_type});
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(result);
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return res.status(500).send('Error uploading to Cloudinary.');
    }
  });
  app.use(cookieParser());
  const server = new ApolloServer({
    schema,
    context: (ctx) => {
      const context: any = ctx;
      console.log(ctx.req.headers.authorization);
      try {
        const user = verifyJwt<User>(ctx.req.headers.authorization!);
        context.user = user;
      } catch (e) {
        return context;
      }
      return context;
    },
    plugins: [
      process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageDisabled() : ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  });
  await server.start();
  server.applyMiddleware({ app });
  app.listen(process.env.PORT || 4000, () => {
    console.log('server started on localhost:4000 ⚡⚡⚡');
  });
  connectToDB();
}

bootstrap();