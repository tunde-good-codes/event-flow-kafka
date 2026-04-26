import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TicketController } from './tickets.controller';
import { TicketService } from './tickets.service';

@Module({
  imports: [HttpModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketsModule {}
