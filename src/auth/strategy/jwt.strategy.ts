import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const remainTime = this.getBetweenTime(payload);
    if (remainTime < 1) {
      const user = await this.userService.getOne(payload.id);
      const refreshToken = this.jwtService.decode(user.refreshToken);
      const remainRefTokenTime = this.getBetweenTime(refreshToken);
      if (remainRefTokenTime < 90) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'login again',
          },
          HttpStatus.FORBIDDEN,
        );
      } else {
        const { id, name } = payload;
        const accessToken = this.jwtService.sign(
          { id, name },
          { expiresIn: '2h' },
        );
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            accessToken: accessToken,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      return { ...payload };
    }
  }

  private getBetweenTime(payload) {
    const { exp } = payload;
    const tokenExp = new Date(exp * 1000);
    const now = new Date();
    return Math.floor((tokenExp.getTime() - now.getTime()) / 1000 / 60);
  }
}
