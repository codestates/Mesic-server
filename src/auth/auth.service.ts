import {
  Injectable,
  BadGatewayException,
  ForbiddenException,
  HttpService,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private httpService: HttpService,
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

  async googleLogin({ authorizationCode }) {
    if (!authorizationCode) {
      throw new ForbiddenException();
    }
    try {
      const GET_TOKEN_URI = 'https://www.googleapis.com/oauth2/v4/token';
      const GET_DATA_URI = 'https://www.googleapis.com/oauth2/v2/userinfo';
      const CLIENT_ID =
        '350695188416-sc4m6nro89c4sii03qm9qaeltqivnie3.apps.googleusercontent.com';
      const accessTokenFromGoogle = await this.httpService
        .post(
          GET_TOKEN_URI,
          {
            client_id: CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: authorizationCode,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000/mainpage',
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();
      console.log({ accessTokenFromGoogle });
      console.log({ token: accessTokenFromGoogle.data.access_token });
      const dataFromToken = await this.httpService
        .get(GET_DATA_URI, {
          headers: {
            Authorization: `Bearer ${accessTokenFromGoogle.data.access_token}`,
          },
        })
        .toPromise();

      const { email, name, picture } = dataFromToken.data;
      const userData = await this.userService.findOne(email);

      if (!userData) {
        const userData = await this.userService.createGoogleUser({
          email,
          name,
          picture,
        });
        const accessToken = this.jwtService.sign({ name }, { expiresIn: '2h' });
        return { accessToken, userData };
      } else {
        const accessToken = this.jwtService.sign({ name }, { expiresIn: '2h' });
        return { accessToken, userData };
      }
    } catch {
      throw new BadGatewayException();
    }
  }

  private saveRefreshToken(id, refreshToken: String): void {
    const newRefreshToken = { refreshToken };
    this.userService.saveToken(id, newRefreshToken);
  }
}
