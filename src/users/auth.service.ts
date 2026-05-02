// src/users/auth.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';

// scrypt returns a callback but we need a promise
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(email: string, password: string) {
    // check if user with giver email already exist
    const users = await this.usersService.find(email);
    if (users.length) throw new BadRequestException('Email Already In Use');

    // generate a random salt string
    const salt = randomBytes(8).toString('hex');

    // hash the user's pasword + salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join hashed result with the salt
    const result = salt + '.' + hash.toString('hex');

    // create a new user and save it
    const user = await this.usersService.create(email, result);
    return user;
  }
  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) throw new NotFoundException('User Not Found');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // console.log(storedHash, 'hash: ', hash.toString('hex'));

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('Bad Password!');

    return user;
  }
}
