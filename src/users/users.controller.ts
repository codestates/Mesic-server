/* express에서 라우터역할 */

import { AuthService } from 'src/auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Delete,
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
import { CreateUserDto } from './dto/create-user.dto';

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

  @Post('/logout/:id')
  logout(@Param('id') userId: string) {
    return this.usersService.logout(userId);
  }

  @Post('/signup')
  signup(@Body() data: CreateUserDto) {
    const newUser = this.usersService.create({ ...data });
    return newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateUser(@Param('id') user_id: string, @Body() data) {
    const updateUser = this.usersService.update(user_id, data);
    return updateUser;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('follow/:id')
  async addFollow(@Param('id') user_id: string, @Body() data) {
    const follow = await this.usersService.addToFollow(user_id, data);
    if (!follow) {
      this.usersService.deleteFromFollow(user_id, data);
    } else {
      return { message: 'success' };
    }
  }
}
