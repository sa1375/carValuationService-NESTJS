// src/users/interceptors/current-user.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Request } from 'express';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.session?.userId;

    if (userId) {
      const user = await this.usersService.findOne(+userId);
      // @ts-expect-error - null or User not undefined or User
      request.currentUser = user;
    }

    return handler.handle();
  }
}
