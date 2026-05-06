// src/users/decprators/current-user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
// ExecutionContext is a wrapper around incoming request .
// why named ExecutionContext and not just Request ?
// this object can be used to abstract a wesocket incoming message , a GRPc request , an HTTP request , ...

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // data is any data or argument that we provide to our decorator when we use it
    // inside this function we are going to work on incoming request
    // what we return in this function is gonna show up as user argument wherever we use ths as decorator
    const request: Request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
