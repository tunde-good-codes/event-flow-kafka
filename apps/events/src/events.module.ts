import { Module } from '@nestjs/common';
import { KafkaModule } from '@app/kafka';
import { DatabaseModule } from '@app/database';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [KafkaModule.register('events-service-group'), DatabaseModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
