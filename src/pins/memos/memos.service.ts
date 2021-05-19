import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pin, PinDocument } from '../schemas/pins.schema';
import { UpdateMemoDto } from './dto/update-memo.dto';

@Injectable()
export class MemosService {
  constructor(@InjectModel(Pin.name) private pinModel: Model<PinDocument>) {}

  //update
  async update(id: string, data: UpdateMemoDto): Promise<Pin> {
    const pin = await this.pinModel.findByIdAndUpdate(id, data);
    if (!pin) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    } else {
      return pin;
    }
  }
}
