import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { SERVICES_PORTS } from '@app/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  //Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(SERVICES_PORTS.AUTH_SERVICE);
  console.log(`Auth Service is running on port ${SERVICES_PORTS.AUTH_SERVICE}`);
}
bootstrap();
