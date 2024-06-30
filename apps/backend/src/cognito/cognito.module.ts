import { Module } from '@nestjs/common';
import { CognitoController } from './cognito.controller';
import { CognitoService } from './cognito.service';

@Module({
  imports: [],
  controllers: [CognitoController],
  providers: [CognitoService],
})
export class CognitoModule {}
