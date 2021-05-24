/* controller & service를 연결 해준다 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemosController } from './memos.controller';
import { MemosService } from './memos.service';
import { Pin, PinSchema } from '../schemas/pins.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }])],
  controllers: [MemosController],
  providers: [MemosService],
})
export class MemosModule {}

// /pins , /locations, /memos, /music, /photos
