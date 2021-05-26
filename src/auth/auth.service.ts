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
    const { id, email, name } = user;
    const refreshToken = this.jwtService.sign({}, { expiresIn: '14d' });
    const accessToken = this.jwtService.sign({ id, name }, { expiresIn: '2h' });
    this.saveRefreshToken(id, refreshToken);
    return { id, name, email, accessToken };
  }

  async googleLogin(user: any) {
    const { accessToken, ...result } = user;
    const isUser = await this.userService.findOne(result.email);

    if (!isUser) {
      await this.userService.createGoogleUser({
        ...result,
      });
      return { accessToken, ...result };
    } else {
      return { accessToken, ...result };
    }
  }

  private saveRefreshToken(id, refreshToken: String): void {
    const newRefreshToken = { refreshToken };
    this.userService.saveToken(id, newRefreshToken);
  }
}
