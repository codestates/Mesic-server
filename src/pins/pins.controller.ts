import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Pin } from './schemas/pins.schema';
import { PinsService } from './pins.service';

@Controller('pins')
export class PinsController{
    constructor(private readonly pinsService: PinsService) {}
}