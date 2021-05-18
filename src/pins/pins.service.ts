import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pin, PinDocument } from './schemas/pins.schema';
import { CreatePinDto } from './dto/create-pin.dto';

@Injectable()
export class PinsService{
    constructor(@InjectModel(Pin.name) private pinModel: Model<PinDocument>) {}
}