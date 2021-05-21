import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PinsModule } from './pins/pins.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    UsersModule,
    PinsModule,
    MongooseModule.forRoot(
      'mongodb+srv://boseong:tavIZyzUPnWRfBJl@cluster0.snujj.mongodb.net/mesic?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
