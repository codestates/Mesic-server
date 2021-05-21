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
  // /GET :id => get userinfo
  @Get() // don't need this method
  async getAllUserInfo(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  getOneUserInfo(@Param('id') user_id: string) {
    const userinfo = this.usersService.getOne(user_id);
    return userinfo;
  }

  // /POST logout
  @Post('/logout')
  logout(@Body() data) {
    /*
    1. 클라이언트에서 정보를 요청을 요청할때 토큰이 있는지 확인을 해주면 된다.
    2. 클라에서 토큰 저장을 하는데 클라에서 지워주면 된다. 
    3. logout 오케이 사인을 보내면 클라에서 토큰을 지워주면 된다. 
    */
    return data;
  }

  // ┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐  ┬ ┬┌─┐┌─┐┬─┐
  // │  ├┬┘├┤ ├─┤ │ ├┤   │ │└─┐├┤ ├┬┘
  // └─┘┴└─└─┘┴ ┴ ┴ └─┘  └─┘└─┘└─┘┴└─
  @Post('/signup')
  signup(@Body() data) {
    const newUser = this.usersService.create({ ...data });
    return newUser;
  }

  // /PATCH :id => modify userinfo
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateUser(@Param('id') user_id: string, @Body() data) {
    const updateUser = this.usersService.update(user_id, data);
    return updateUser;
  }
}
