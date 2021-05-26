// import * as fs from 'fs';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as fs from 'fs';

// const httpsOptions = {
//   key: fs.readFileSync('./secrets/private-key.pem'),
//   cert: fs.readFileSync('./secrets/public-certificate.pem'),
// };

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    // { httpsOptions },
    { cors: true },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
