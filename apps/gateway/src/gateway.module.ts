import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EventsModule } from './events/events.module';
import { JwtStrategy } from './jwt.strategy';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
    }),
    AuthModule,
    EventsModule,
    TicketsModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService, JwtStrategy],
})
export class GatewayModule {}
