import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pin, PinDocument } from '../schemas/pins.schema';
import { CreatePinDto } from '../dto/create-pin.dto';

@Injectable()
export class locationsService {
  constructor(@InjectModel(Pin.name) private pinModel: Model<PinDocument>) {}

  // create
  async update(id: string, data): Promise<Pin> {
    const pin = await this.pinModel.findByIdAndUpdate(id, data);
    if (!pin) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    } else {
      return pin;
    }
  }
}
