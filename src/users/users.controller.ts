/* express에서 라우터역할 */

import { AuthService } from 'src/auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Res,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
  Session,
} from '@nestjs/common';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getAllUserInfo(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  getOneUserInfo(@Param('id') userId: string) {
    const userinfo = this.usersService.getOne(userId);
    return userinfo;
  }

  @Post('/logout')
  logout(@Param('id') userId: string) {
    return this.usersService.logout(userId);
  }

  @Post('/signup')
  signup(@Body() data) {
    const newUser = this.usersService.create({ ...data });
    return newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateUser(@Param('id') user_id: string, @Body() data) {
    const updateUser = this.usersService.update(user_id, data);
    return updateUser;
  }
}
