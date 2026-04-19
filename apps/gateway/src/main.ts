import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  process.title = 'gateway';
  const app = await NestFactory.create(GatewayModule);
  app.enableShutdownHooks();
  const logger = new Logger('gateway logger');

  const port = Number(process.env.GATEWAY_PORT ?? 3000);

  await app.listen(port);
  logger.log(`Gateway running on port: ${port} `);
}
bootstrap();
