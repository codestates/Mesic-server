/* controller & service를 연결 해준다 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { Pin, PinSchema } from '../schemas/pins.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }])],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}

// /pins , /locations, /memos, /music, /photos
