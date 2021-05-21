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
import { Pin } from './schemas/pins.schema';
import { PinsService } from './pins.service';
import { ModulesContainer } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('pins') // pins/locations
export class PinsController {
  constructor(private readonly pinsService: PinsService) {}

  // pin create and delete
  @Get()
  async getAll(): Promise<Pin[]> {
    return await this.pinsService.getAll();
  }

  @Get(':id')
  getPin(@Param('id') pins_id: string) {
    return this.pinsService.getPinInfo(pins_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPin(@Body() data) {
    const newPin = this.pinsService.create(data);
    return newPin;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePin(@Param('id') pins_id: string) {
    const result = await this.pinsService.delete(pins_id);
    if (result.n === 1) {
      return { message: 'Thumbs up!' };
    } else {
      return { message: 'Fucked up!' };
    }
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
