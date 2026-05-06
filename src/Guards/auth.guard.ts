// src/Guards/auth.guard.ts

import { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    return Boolean(request?.session?.userId);
  }
}
