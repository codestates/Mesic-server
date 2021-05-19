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

  @Patch(':id')
  updateMusic(@Param('id') pin_id: string, @Body() data) {
    const updatePin = this.pinsService.update(pin_id, data);
    return updatePin;
  }
}
