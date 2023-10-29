import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { retry } from 'ts-retry-promise';
@Injectable()
export class AppService {
  private counter = 0;
  
  constructor(@Inject('QUEUE_SERVICE') private readonly queueClient: ClientProxy) {
  }

  async onApplicationBootstrap() {
    Logger.debug('Connecting to queue service...');
    await retry(() => this.queueClient.connect(), { retries: 5, delay: 500 }).catch(e => { 
      Logger.error(`Failed to connect to queue service, reason: ${JSON.stringify(e)}`);
      throw e;
    });
  }

  async sendMessage(): Promise<string> {
    this.counter = this.counter + 1;
    Logger.debug('Sending message: ' + this.counter)
    return this.queueClient.send('msg', this.counter).toPromise().then(response => {
      Logger.debug(`Received response: '${response}'`);
      return response;
    }).catch(e => {
      Logger.error(`Failed to send message '${this.counter}', reason: ${JSON.stringify(e)}`); 
      throw e;
    });
  }
}
