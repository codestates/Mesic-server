import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TimeoutError } from 'rxjs';
import { AppModule } from './app.module';

const port = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(port);
}
bootstrap();
