import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Pin } from './schemas/pins.schema';
import { PinsService } from './pins.service';
import { ModulesContainer } from '@nestjs/core';

@Controller('pins') // pins/locations
export class PinsController {
  constructor(private readonly pinsService: PinsService) {}

  // pin create and delete
  @Post()
  createPin(@Body() data) {
    const newPin = this.pinsService.create(data);
    return newPin;
  }

  /*
  data = pins = {
    location: {},
    music: string,
    memo: string,
    photos: string,
    user_id: string
  }
   */
}
