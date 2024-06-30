import { Controller, Get, Post } from '@nestjs/common';
import { CognitoService } from './cognito.service';

@Controller()
export class CognitoController {
  constructor(private readonly cognitoService: CognitoService) {}

  @Get()
  getHello(): string {
    console.log('Hello from lambda function');
    return this.cognitoService.getHello();
  }
  @Post()
  testHello(): string {
    console.log('Hello from lambda function post');
    return this.cognitoService.getHello();
  }
}
