import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';

@Controller('memos')
export class MemosController {
    // GetLocation 
    @Get()
    getMemo() {
    }

    // Postlocation
    @Post("/")
    postMemo(){
    }

    // Modifylocation
    @Patch("/")
    modifyMemo(){
    }

    // Deletelocation
    @Delete("/")
    deleteMemo(){
    }
}