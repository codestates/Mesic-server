import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PinsModule } from './pins/pins.module';

@Module({
  imports: [
    UsersModule,
    PinsModule,
    MongooseModule.forRoot(
      'mongodb+srv://boseong:tavIZyzUPnWRfBJl@cluster0.snujj.mongodb.net/mesic?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
