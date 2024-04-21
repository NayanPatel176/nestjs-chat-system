import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Nayan Hey';
  }
  postHello(): string {
    return 'Hello World! Nayan Hey Post';
  }
}
