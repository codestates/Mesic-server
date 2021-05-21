import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Pin } from '../schemas/pins.schema';
import { MusicService } from './music.service';
import { ModulesContainer } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('music') // pins/locations
export class MusicController {
  constructor(private readonly pinsService: MusicService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateMusic(@Param('id') pin_id: string, @Body() data) {
    const updatePin = this.pinsService.update(pin_id, data);
    return updatePin;
  }
}
