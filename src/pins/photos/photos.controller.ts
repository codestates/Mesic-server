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
import { PhotosService } from './photos.service';
import { ModulesContainer } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('photos') // pins/locations
export class PhotosController {
  constructor(private readonly pinsService: PhotosService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePhoto(@Param('id') pin_id: string, @Body() data) {
    const updatePin = this.pinsService.update(pin_id, data);
    return updatePin;
  }
}
