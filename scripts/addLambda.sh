#!/bin/bash

# Check if the script received an argument
if [ -z "$1" ]; then
  echo "Please provide the name of the lambda function."
  exit 1
fi

LAMBDA_NAME=$1
FOLDER_NAME=$(echo "$LAMBDA_NAME" | tr '[:upper:]' '[:lower:]')
CAPITALIZED_LAMBDA_NAME="$(tr '[:lower:]' '[:upper:]' <<< ${LAMBDA_NAME:0:1})${LAMBDA_NAME:1}"

# Define the path to the src folder
SRC_FOLDER="apps/backend/src"

# Create the folder inside the src folder
mkdir -p $SRC_FOLDER/$FOLDER_NAME

# Create user.controller.ts with sample code
cat > $SRC_FOLDER/$FOLDER_NAME/$LAMBDA_NAME.controller.ts <<EOL
import { Controller, Get } from '@nestjs/common';
import { ${CAPITALIZED_LAMBDA_NAME}Service } from './${LAMBDA_NAME}.service';

@Controller('${FOLDER_NAME}')
export class ${CAPITALIZED_LAMBDA_NAME}Controller {
  constructor(private readonly ${LAMBDA_NAME}Service: ${CAPITALIZED_LAMBDA_NAME}Service) {}

  @Get()
  getHello(): string {
    return this.${LAMBDA_NAME}Service.getHello();
  }
}
EOL

# Create user.module.ts with sample code
cat > $SRC_FOLDER/$FOLDER_NAME/$LAMBDA_NAME.module.ts <<EOL
import { Module } from '@nestjs/common';
import { ${CAPITALIZED_LAMBDA_NAME}Controller } from './${LAMBDA_NAME}.controller';
import { ${CAPITALIZED_LAMBDA_NAME}Service } from './${LAMBDA_NAME}.service';

@Module({
  imports: [],
  controllers: [${CAPITALIZED_LAMBDA_NAME}Controller],
  providers: [${CAPITALIZED_LAMBDA_NAME}Service],
})
export class ${CAPITALIZED_LAMBDA_NAME}Module {}
EOL

# Create user.service.ts with sample code
cat > $SRC_FOLDER/$FOLDER_NAME/$LAMBDA_NAME.service.ts <<EOL
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${CAPITALIZED_LAMBDA_NAME}Service {
  getHello(): string {
    return 'Hello from ${CAPITALIZED_LAMBDA_NAME}Service!';
  }
}
EOL

# Create main.ts with sample code
cat > $SRC_FOLDER/$FOLDER_NAME/main.ts <<EOL
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { ${CAPITALIZED_LAMBDA_NAME}Module } from './${LAMBDA_NAME}.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(${CAPITALIZED_LAMBDA_NAME}Module);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

EOL

echo "Lambda function setup for '${LAMBDA_NAME}' created successfully in the src folder!"
