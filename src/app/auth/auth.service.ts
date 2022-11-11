import { DateTime } from 'luxon';
import { UserService } from './../user/user.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const token = this.jwtService.sign(user);
    const payLoard = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );
    const expiresIn = DateTime.fromMillis(payLoard.exp * 1000)
      .toUTC()
      .toISO();
    return {
      token,
      expiresIn,
      user,
    };
  }

  async validate(email: string, password: string) {
    try {
      const user = await this.userService.findOneByEmail(email);
      const isValid = this.userService.validatePassword(
        password,
        user.password,
      );
      if (!isValid) throw new Error();

      delete user.password;
      return user;
    } catch (err) {
      throw new ForbiddenException('E-mail ou senha estão inválidos.');
    }
  }
}
