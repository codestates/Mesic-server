import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pin, PinDocument } from '.././schemas/pins.schema';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotosService {
  constructor(@InjectModel(Pin.name) private pinModel: Model<PinDocument>) {}

  // update
  async update(id: string, data: UpdatePhotoDto): Promise<Pin> {
    const updatedpin = await this.pinModel.findByIdAndUpdate(id, data);
    if (!updatedpin) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    } else {
      return updatedpin;
    }
  }
}
