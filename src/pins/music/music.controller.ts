import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Pin } from '../schemas/pins.schema';
import { MusicService } from './music.service';
import { ModulesContainer } from '@nestjs/core';

@Controller('music') // pins/locations
export class MusicController {
  constructor(private readonly pinsService: MusicService) {}

  // create/read/update/delete pin
  // POST /pins
  //
  @Post()
  createPin(@Body() data) {
    const newPin = this.pinsService.create(data);
    return newPin;
  }

  /*
    기능 적으로 수정해야하는 부분ㅇ
    pin 3가지가 꼭다 들어가야하는건 아니다. 
    Post /pins => 정보가 들어가는데 
     */
}
