import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { CreateGoogleUserDto } from './users/dto/create-google-user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('google/login')
  async googleLogin(@Body() userinfo: CreateGoogleUserDto) {
    if (!userinfo) {
      throw new NotFoundException();
    }
    return await this.authService.googleLogin(userinfo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
