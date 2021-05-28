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
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photos') // pins/locations
export class PhotosController {
  constructor(private readonly pinsService: PhotosService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePhoto(@Param('id') pin_id: string, @Body() data: UpdatePhotoDto) {
    const updatePin = this.pinsService.update(pin_id, data);
    return updatePin;
  }
}
