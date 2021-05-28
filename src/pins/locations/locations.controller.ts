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
import { locationsService } from './locations.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

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
