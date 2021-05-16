import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://boseong:tavIZyzUPnWRfBJl@cluster0.snujj.mongodb.net/mesic?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
