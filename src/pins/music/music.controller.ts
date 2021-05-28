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
import { MusicService } from './music.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateMusicDto } from './dto/update-music.dto';

@Controller('music') // pins/locations
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateMusic(@Param('id') pin_id: string, @Body() data: UpdateMusicDto) {
    const updatePin = this.musicService.update(pin_id, data);
    return updatePin;
  }
}
