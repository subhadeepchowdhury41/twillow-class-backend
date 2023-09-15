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

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: resolvers,
    authChecker: authChecker
  });
  const app = express();
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
  app.listen(4000, () => {
    console.log('server started on localhost:4000 ⚡⚡⚡');
  });
  connectToDB();
}

bootstrap();