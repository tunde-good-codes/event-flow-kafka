import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SERVICES_PORTS } from '@app/common';
import { EventsModule } from './events.module';

async function bootstrap() {
  const app = await NestFactory.create(EventsModule);

  //Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(SERVICES_PORTS.EVENTS_SERVICE);
  console.log(
    `Events Service is running on port ${SERVICES_PORTS.EVENTS_SERVICE}`,
  );
}
bootstrap();
