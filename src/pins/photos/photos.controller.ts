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

  @Patch(':id')
  updatePhoto(@Param('id') pin_id: string, @Body() data) {
    const updatePin = this.pinsService.update(pin_id, data);
    return updatePin;
  }
}
