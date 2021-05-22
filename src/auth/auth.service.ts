import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService, // private userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user || (user && !compare(password, user.password))) {
      // if (user && user.password === password) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    /* 
    1. create accessToken & refreshToken 
    2. save refreshToken in Database
    3. send access token & refreshToken
    */
    const { id, username, userId } = user;
    const refreshToken = this.jwtService.sign({}, { expiresIn: '14d' });
    const accessToken = this.jwtService.sign(
      { username, userId },
      { expiresIn: '1m' },
    );
    this.saveRefreshToken(id, refreshToken);
    return { id, accessToken, refreshToken };
  }

  // 유저가 현재 가진 accessToken의 validation을 파악하는 함수
  async validateAccessToken() {
    // accesstoken이 만료되고, refreshtoken은 만료되지 않은 상황 -> accesstoken 갱신
  }

  private saveRefreshToken(id, refreshToken: String): void {
    const newRefreshToken = { refreshToken };
    this.userService.saveToken(id, newRefreshToken);
  }
}
