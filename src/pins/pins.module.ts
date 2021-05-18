/* controller & service를 연결 해준다 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsModule } from './locations/locations.module';
import { MemosModule } from './memos/memos.module';
import { MusicModule } from './music/music.module';
import { PhotosModule } from './photos/photos.module';
import { PinsController } from './pins.controller';
import { PinsService } from './pins.service';
import { Pin, PinSchema } from './schemas/pins.schema';

@Module({
  imports: [
    PhotosModule,
    MusicModule,
    MemosModule,
    LocationsModule,
    MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }]),
  ],
  controllers: [PinsController],
  providers: [PinsService],
})
export class PinsModule {}

// /pins , /locations, /memos, /music, /photos
