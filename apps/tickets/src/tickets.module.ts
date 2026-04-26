import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { KafkaModule } from '@app/kafka';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [KafkaModule.register('ticket-service-group'), DatabaseModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
