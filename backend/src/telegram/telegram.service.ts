import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ILead } from 'src/lead/model/lead';
import { TokenService } from '../token/token.service';

@Injectable()
export class TelegramService {
  constructor(
    private readonly httpService: HttpService,
    private readonly tokenService: TokenService,
  ) {}

  async sendLead(lead: ILead) {
    const notifications = await this.tokenService.getNotifications();

    if (!notifications.telegramBotToken || !notifications.telegramChatId) {
      throw new Error('Telegram token or chat ID is not configured');
    }

    const resp: AxiosResponse = await firstValueFrom(
      this.httpService.post(
        `https://api.telegram.org/bot${notifications.telegramBotToken}/sendMessage`,
        {
          chat_id: notifications.telegramChatId,
          text: JSON.stringify(lead, null, 2),
        },
      ),
    );
    return resp.data;
  }

  async sendTestMessage(token: string, chatId: string) {
    const resp: AxiosResponse = await firstValueFrom(
      this.httpService.post(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          chat_id: chatId,
          text: 'Test message from API',
        },
      ),
    );
    return resp.data;
  }
}
