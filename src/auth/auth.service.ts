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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user || (user && !compare(password, user.password))) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    const { id, name } = user;
    const refreshToken = this.jwtService.sign({}, { expiresIn: '14d' });
    const accessToken = this.jwtService.sign({ id, name }, { expiresIn: '2h' });
    this.saveRefreshToken(id, refreshToken);
    return { accessToken };
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
