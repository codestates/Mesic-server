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
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
