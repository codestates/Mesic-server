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
import { PhotosService } from './photos.service';
import { ModulesContainer } from '@nestjs/core';

@Controller('photos') // pins/locations
export class PhotosController {
  constructor(private readonly pinsService: PhotosService) {}

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
