import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';

@Controller('Photos')
export class MemosController {
    // GetLocation 
    @Get()
    getPhoto() {
    }

    // Postlocation
    @Post("/")
    postPhoto(){
    }

    // Modifylocation
    @Patch("/")
    modifyPhoto(){
    }

    // Deletelocation
    @Delete("/")
    deletePhoto(){
    }
}