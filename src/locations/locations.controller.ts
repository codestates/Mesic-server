import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';

@Controller('locations')
export class LocationsController {
    // GetLocation 
    @Get()
    getLocation() {
    }

    // Postlocation
    @Post("/")
    postLocation(){
    }

    // Modifylocation
    @Patch("/")
    modifyLocation(){
    }

    // Deletelocation
    @Delete("/")
    deleteLocation(){
    }
}