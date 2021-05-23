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

  /* 
  client => access token // DB=> refresh token 
  payload에서 우리는 유저의 이메일하고 오브젝트아이디를 알 수 있다. 
  아이디를 통해서 데이터베이스의 리프레시 토큰에 접근할 수 있다. 
  1. payload통해 해당 유저의 토큰의 validation 판단.
  2. 이게 유효하면 그냥 지나가고 
  3. 아니다? 그러면 리프래쉬 토큰을 확인하기 위해  payload.id을 사용해 refresh token을 가져와서 확인 
  4. refresh token이 만료되었는지 안되었는지에 따라서 나누어준다. 
  여기서 잠깐.
  필요한 기능이 만료되었는지 확인하는 함수 
  */
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
        // accessToken 재발급
        const { id, name } = payload;
        const accessToken = this.jwtService.sign(
          { id, name },
          { expiresIn: '10m' },
        );
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            accessToken: accessToken,
          },
          HttpStatus.FORBIDDEN,
        );
        // 여기서 에러를 보내서 아래 동작들을 못하게 해야하는데 그게아니라
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
