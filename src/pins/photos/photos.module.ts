/* controller & service를 연결 해준다 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { Pin, PinSchema } from '.././schemas/pins.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}

// /pins , /locations, /memos, /music, /photos
