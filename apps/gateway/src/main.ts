import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { GatewayModule } from './gateway.module';
import { SERVICES_PORTS } from '@app/common';

async function bootstrap() {
  process.title = 'gateway';
  const app = await NestFactory.create(GatewayModule);
  app.enableShutdownHooks();
  const logger = new Logger('gateway logger');

  const port = Number(process.env.GATEWAY_PORT ?? 3000);

  await app.listen(process.env.PORT || SERVICES_PORTS.API_GATEWAY);
  console.log(
    `API Gateway is running on port ${process.env.PORT || SERVICES_PORTS.API_GATEWAY}`,
  );
  logger.log(`Gateway running on port: ${port} `);
}
bootstrap();
