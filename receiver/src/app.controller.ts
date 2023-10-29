import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('msg')
  getMessage(@Payload() message: string | number): string {
    Logger.debug(`Received message '${message}'`);
    return 'Received: ' + message;
  }
}
