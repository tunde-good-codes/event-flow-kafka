/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  getHello(): string {
    return `Hello World!`;
  }
}
