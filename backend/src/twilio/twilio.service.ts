import { Injectable } from '@nestjs/common';

@Injectable()
export class TwilioService {
  async sendMessage() {
    // const client = require('twilio')(accountSid, authToken);
    // client.messages.create({
    //   body: 'message',
    //   from: '+17073703448',
    //   to: '+18777804236',
    // });
  }
}
