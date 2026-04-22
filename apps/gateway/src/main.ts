import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GatewayModule } from './gateway.module';
import { SERVICES_PORTS } from '@app/common';

async function bootstrap() {
  process.title = 'gateway';
  const app = await NestFactory.create(GatewayModule);
  app.enableShutdownHooks();
  const logger = new Logger('gateway logger');

  const port = Number(process.env.GATEWAY_PORT ?? 3000);
  app.enableCors({
    origin: ['http://localhost:4000', 'https://mytrusteddomain.com'].filter(
      Boolean,
    ),
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  //Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT || SERVICES_PORTS.API_GATEWAY);
  console.log(
    `API Gateway is running on port ${process.env.PORT || SERVICES_PORTS.API_GATEWAY}`,
  );
  logger.log(`Gateway running on port: ${port} `);
}
bootstrap();
