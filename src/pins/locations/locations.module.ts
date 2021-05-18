/* controller & service를 연결 해준다 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsController } from './locations.controller';
import { locationsService } from './locations.service';
import { Pin, PinSchema } from '../schemas/pins.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }])],
  controllers: [LocationsController],
  providers: [locationsService],
})
export class LocationsModule {}

// /pins , /locations, /memos, /music, /photos
