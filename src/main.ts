import * as fs from 'fs';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 4000;

// const httpsOptions = {
//   key: fs.readFileSync('./secrets/private-key.pem'),
//   cert: fs.readFileSync('./secrets/public-certificate.pem'),
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(port);
}
bootstrap();
