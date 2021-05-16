import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';

@Controller('Music')
export class MusicController {
    // GetLocation 
    @Get()
    getMusic() {
    }

    // Postlocation
    @Post("/")
    postMusic(){
    }

    // Modifylocation
    @Patch("/")
    modifyMusic(){
    }

    // Deletelocation
    @Delete("/")
    deleteMusic(){
    }
}