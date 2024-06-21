import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config({
    path: '.env',
  });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    cors: true,
    logger: ['error', 'warn', 'log'],
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true,
        transform: true,
        dismissDefaultMessages: false,
        validationError: {
            target: true,
            value: true,
        },
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port, () => console.log(`listening on port ${port}`));
}
bootstrap();
