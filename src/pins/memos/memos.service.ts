import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pin, PinDocument } from '../schemas/pins.schema';
import { CreatePinDto } from '../dto/create-pin.dto';

@Injectable()
export class MemosService {
  constructor(@InjectModel(Pin.name) private pinModel: Model<PinDocument>) {}

  // create
  async create(createPinDto: CreatePinDto): Promise<Pin> {
    const createPin = new this.pinModel(createPinDto);
    return await createPin.save();
  }

  // get
  async getMemo(id: string) {
    const pin = await this.pinModel.findById(id).exec();
    if (!pin) {
      throw new NotFoundException();
    } else {
      return pin.memo;
    }
  }
}