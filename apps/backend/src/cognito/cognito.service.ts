import { Injectable } from '@nestjs/common';

@Injectable()
export class CognitoService {
  getHello(): string {
    return 'Hello from CognitoService!';
  }
}
