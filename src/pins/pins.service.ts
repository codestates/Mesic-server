import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pin, PinDocument } from './schemas/pins.schema';
import { CreatePinDto } from './dto/create-pin.dto';

@Injectable()
export class PinsService {
  constructor(@InjectModel(Pin.name) private pinModel: Model<PinDocument>) {}

  async getAll(): Promise<Pin[]> {
    return await this.pinModel.find().exec();
  }

  // get
  async getPinInfo(id): Promise<Pin> {
    const pinInfo = await this.pinModel.findById(id).exec();
    return pinInfo;
  }

  // create
  async create(createPinDto: CreatePinDto): Promise<Pin> {
    const createPin = new this.pinModel(createPinDto);
    return await createPin.save();
  }

  // delete
  async delete(id) {
    const deletePin = this.pinModel.deleteOne({ _id: id }).exec();
    return deletePin;
  }
}
