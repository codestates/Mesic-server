import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getuserinfo() {
        return "here is user info"
    }
    
    @Get("/:id")
    getoneUser(@Param('id') id: string) {
        return `here is ${id} user info`;
    }

    @Post("/login")
    login(@Body() data) {
        return data; 
    }

    @Patch("/:id")
    updateUser(@Param('id') userid: string, @Body() data){
        return {
            userid: userid,
            ...data
        };
    }
}
