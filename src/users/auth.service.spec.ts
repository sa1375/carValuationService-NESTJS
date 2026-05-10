// src/users/auth.service.spec.ts

import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
// import { it, describe } from '';

it('can create an instance of auth service', async () => {
  // create a fake users service to use as dependency
  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };
  // create a DI container
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: UsersService, useValue: fakeUsersService },
    ],
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
