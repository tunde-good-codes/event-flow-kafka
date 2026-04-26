import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKER, KAFKA_CLIENT_ID } from '@app/kafka';
import { SERVICES_PORTS } from '@app/common';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  // connect kafka microservices for consuming events
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `${KAFKA_CLIENT_ID}-notifications`,
        brokers: [KAFKA_BROKER],
      },
      consumer: {
        groupId: `notifications-consumer-group`,
      },
    },
  });

  // start microservices (kafka consumer)
  await app.startAllMicroservices();

  await app.listen(SERVICES_PORTS.NOTIFICATIONS_SERVICE);
  console.log(
    `Notifications Service is running on port ${SERVICES_PORTS.NOTIFICATIONS_SERVICE}`,
  );
  console.log('KAfka consumer started');
}
bootstrap();
