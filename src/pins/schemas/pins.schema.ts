/* mongoDB의 스키마 작성 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'; // import { Document } from 'mongoose'
import { User } from '../../users/schemas/users.schema';

export type PinDocument = Pin & Document;

@Schema()
export class Pin {
  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  music: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  memo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User })
  user_id: User;
}

export const PinSchema = SchemaFactory.createForClass(Pin);
