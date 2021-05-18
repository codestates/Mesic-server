/* controller & service를 연결 해준다 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PinsController } from './pins.controller';
import { PinsService } from './pins.service';
import { Pin, PinSchema } from './schemas/pins.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }])],
  controllers: [PinsController],
  providers: [PinsService],
})
export class PinsModule {}
