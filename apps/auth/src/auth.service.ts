/* eslint-disable @typescript-eslint/require-await */
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_SERVICE } from './../../../libs/kafka/src/kafka.module';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { KAFKA_TOPICS } from '@app/kafka';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  logger = new Logger('auth-service-log');

  async onModuleInit() {
    await this.kafkaClient.connect();
    this.logger.log('auth service connected');
  }

  getHello(): string {
    return 'Hello World!';
  }

  async simulateUserRegistration(email: string) {
    this.kafkaClient.emit(KAFKA_TOPICS.USER_REGISTERED, {
      email,
      timestamp: new Date().toISOString(),
    });

    return `user registered: ${email} `;
  }
}
