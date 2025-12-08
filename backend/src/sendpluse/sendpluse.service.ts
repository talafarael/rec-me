import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IAuthSendpluse } from './types/auth';
import { AxiosResponse } from 'axios';
import { SendpulseSendLeadDto } from './dto/send-lead.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendpluseService {
  private readonly secret: string;
  private readonly clientId: string;
  private readonly addressBookId: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.secret = this.configService.get<string>('sendpulse.secret')!;
    this.clientId = this.configService.get<string>('sendpulse.clientId')!;
    this.addressBookId = this.configService.get<string>(
      'sendpulse.addressBookId',
    )!;
  }

  async sendLead(data: SendpulseSendLeadDto) {
    try {
      const token = await this.authApi();
      return this.sendLeadApi(token, data);
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
      const addressBookId = id || Number(this.addressBookId);
      return this.getMailingListApi(token, addressBookId);
    } catch (e) {
      const message = e?.response?.data
        ? JSON.stringify(e.response.data)
        : e.message;
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
  private async sendLeadApi(token: string, data: SendpulseSendLeadDto) {
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
          `https://api.sendpulse.com/addressbooks/${this.addressBookId}/emails`,
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

  private async authApi(): Promise<string> {
    console.log(this.clientId);
    const resp: AxiosResponse<IAuthSendpluse> = await firstValueFrom(
      this.httpService.post(
        'https://api.sendpulse.com/oauth/access_token',
        {
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.secret,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
          },
        },
      ),
    );
    return resp?.data?.access_token;
  }
}
