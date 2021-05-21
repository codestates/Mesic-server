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
import { locationsService } from './locations.service';
import { ModulesContainer } from '@nestjs/core';
import { UpdatePinDto } from '../dto/update-pin.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('locations') // pins/locations
export class LocationsController {
  constructor(private readonly pinsService: locationsService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateLocation(@Param('id') pin_id: string, @Body() data) {
    const updateLocation = this.pinsService.update(pin_id, data);
    return updateLocation;
  }
}
