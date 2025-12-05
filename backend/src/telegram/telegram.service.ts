import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ILead } from 'src/lead/model/lead';

@Injectable()
export class TelegramService {
  private readonly token: string;
  private readonly chatId: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = this.configService.get<string>('telegram.token')!;
    this.chatId = this.configService.get<string>('telegram.chatId')!;
  }
  async sendLead(lead: ILead) {
    const resp: AxiosResponse = await firstValueFrom(
      this.httpService.post(
        `https://api.telegram.org/bot${this.token}/sendMessage`,
        {
          chat_id: this.chatId,
          text: JSON.stringify(lead, null, 2),
        },
      ),
    );
    return resp.data;
  }
}
