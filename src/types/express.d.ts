// src/types/express.d.ts

import 'express';
import { User } from '../users/user.entity';

declare module 'express' {
  interface Request {
    session?: {
      userId: number;
    };
    currentUser?: User;
  }
}
