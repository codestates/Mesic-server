/* express에서 라우터역할 */

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  Session,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

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

  // ┬  ┌─┐┌─┐┬┌┐┌
  // │  │ ││ ┬││││
  // ┴─┘└─┘└─┘┴┘└┘

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Session() session,
    @Request() req,
    @Res({ passthrough: true }) response,
  ) {
    const access_token = await (
      await this.authService.login(req.user)
    ).access_token;
    await response.cookie('Authorization', access_token);
    return req.user;
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
  @Patch('/:id')
  updateUser(@Param('id') user_id: string, @Body() data) {
    const updateUser = this.usersService.update(user_id, data);
    return updateUser;
  }
}
