import { NestFactory } from '@nestjs/core';
import { MediaModule } from './media.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'media';
  const logger = new Logger('Media bootstrap');
  const rmqUrl =
    process.env.RABBITMQ_URL ??
    'amqps://drwoxkrq:HXrHBS7RVrnAfBPPViPpcmXvYHW2QBcJ@leopard.lmq.cloudamqp.com/drwoxkrq';
  const queue = process.env.MEDIA_QUEUE ?? 'media_queue';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MediaModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.enableShutdownHooks();
  await app.listen();
  logger.log(`media RMQ running on queue: ${queue} via ${rmqUrl}`);
}
bootstrap();
