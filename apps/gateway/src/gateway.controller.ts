import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('health')
  getHello() {
    return this.gatewayService.getHello();
  }
  @Get()
  hello() {
    return this.gatewayService.getHello();
  }
}
