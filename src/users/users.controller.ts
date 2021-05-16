/* express에서 라우터역할 */

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersSevice: UsersService) {}

  @Get() //우선순위가 더 높다
  async getuserinfo(): Promise<User[]> {
    return await this.usersSevice.getAll();
  }

  // @Get(':id')
  // getoneUser(@Param('id') id: string) {
  //   return `here is ${id} user info`;
  // }

  @Post('login')
  login(@Body() data) {
    /* 
    1. 몽고디비에 유저정보가 있는 확인 
    2. 있으면 ok => token을 던저줌 / 없으면 에러 
    */
    const newUser = this.usersSevice.create({ ...data });
    return newUser;
  }

  @Post('/logout')
  logout(@Body() data) {
    /*
    1. 클라이언트에서 정보를 요청을 요청할때 토큰이 있는지 확인을 해주면 된다.
    2. 클라에서 토큰 저장을 하는데 클라에서 지워주면 된다. 
    3. logout 오케이 사인을 보내면 클라에서 토큰을 지워주면 된다. 
    */
    return data;
  }

  @Post('/signup')
  signup(@Body() data) {
    return data;
  }

  @Patch('/:id')
  updateUser(@Param('id') userid: string, @Body() data) {
    return {
      userid: userid,
      ...data,
    };
  }
}

/*

/POST login
/POST logout
/POST signup
/GET :id => get userinfo 
/PATCH :id => modify userinfo

*/
