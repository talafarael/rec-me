import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IAuthSendpluse } from './types/auth';
import { AxiosResponse } from 'axios';
import { SendpulseSendLeadDto } from './dto/send-lead.dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class SendpluseService {
  constructor(
    private readonly httpService: HttpService,
    private readonly tokenService: TokenService,
  ) {}

  async sendLead(data: SendpulseSendLeadDto) {
    try {
      const token = await this.authApi();
      const notifications = await this.tokenService.getNotifications();
      const addressBookId = notifications.sendpulseAddressBookId;
      if (!addressBookId) {
        throw new Error('Sendpulse address book ID is not configured');
      }
      return this.sendLeadApi(token, data, addressBookId);
    } catch (e) {
      const message = e?.response?.data
        ? JSON.stringify(e.response.data)
        : e.message;
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  async getMailingList(id?: number) {
    try {
      const token = await this.authApi();
      const notifications = await this.tokenService.getNotifications();
      const addressBookId =
        id || Number(notifications.sendpulseAddressBookId);
      if (!addressBookId) {
        throw new Error('Sendpulse address book ID is not configured');
      }
      return this.getMailingListApi(token, addressBookId);
    } catch (e) {
      const message = e?.response?.data
        ? JSON.stringify(e.response.data)
        : e.message;
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
  private async sendLeadApi(
    token: string,
    data: SendpulseSendLeadDto,
    addressBookId: string,
  ) {
    const allowedVars = [
      'name',
      'sub1',
      'sub2',
      'sub3',
      'sub4',
      'service',
      'pixel',
      'Имя',
      'Phone',
    ];

    const variables = Object.fromEntries(
      Object.entries({
        name: data.name,
        sub1: data.sub1,
        sub2: data.sub2,
        sub3: data.sub3,
        sub4: data.sub4,
        service: data.service,
        pixel: data.pixel,
        Имя: data.name,
        Phone: data.phone,
      }).filter(([key, value]) => value && allowedVars.includes(key)),
    );

    const payload = {
      emails: [
        {
          email: data.email,
          variables,
        },
      ],
    };

    try {
      const resp: AxiosResponse = await firstValueFrom(
        this.httpService.post(
          `https://api.sendpulse.com/addressbooks/${addressBookId}/emails`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );

      return resp.data;
    } catch (e) {
      const message = e?.response?.data ? e.response.data : e.message;
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
  private async getMailingListApi(token: string, id: number) {
    try {
      const resp: AxiosResponse = await firstValueFrom(
        this.httpService.get(
          `https://api.sendpulse.com/addressbooks/${id}/emails`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );

      return resp.data;
    } catch (e) {
      const message = e?.response?.data ? e.response.data : e.message;
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  async testSendpulse(
    secret: string,
    clientId: string,
    addressBookId: string,
  ) {
    try {
      const token = await this.authApiWithCredentials(secret, clientId);
      return this.getMailingListApi(token, Number(addressBookId));
    } catch (e) {
      const message = e?.response?.data
        ? JSON.stringify(e.response.data)
        : e.message;
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  private async authApi(): Promise<string> {
    const notifications = await this.tokenService.getNotifications();
    
    if (!notifications.sendpulseClientId || !notifications.sendpulseSecret) {
      throw new Error('Sendpulse client ID or secret is not configured');
    }

    return this.authApiWithCredentials(
      notifications.sendpulseSecret,
      notifications.sendpulseClientId,
    );
  }

  private async authApiWithCredentials(
    secret: string,
    clientId: string,
  ): Promise<string> {
    const resp: AxiosResponse<IAuthSendpluse> = await firstValueFrom(
      this.httpService.post(
        'https://api.sendpulse.com/oauth/access_token',
        {
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: secret,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    return resp?.data?.access_token;
  }
}
