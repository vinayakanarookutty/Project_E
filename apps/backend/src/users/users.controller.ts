import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { APIGatewayProxyEvent } from 'aws-lambda';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(@Req() request: APIGatewayProxyEvent): string {
    console.log('From controller', request);
    return this.usersService.getHello();
  }
}
