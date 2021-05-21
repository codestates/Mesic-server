import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pin, PinDocument } from '../schemas/pins.schema';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicService {
  constructor(@InjectModel(Pin.name) private pinModel: Model<PinDocument>) {}

  async update(id: string, data: UpdateMusicDto): Promise<Pin> {
    const updatedpin = await this.pinModel.findByIdAndUpdate(id, data);
    if (!updatedpin) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    } else {
      return updatedpin;
    }
  }
}
