import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { UsersModule } from './users.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(UsersModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log(event);
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
