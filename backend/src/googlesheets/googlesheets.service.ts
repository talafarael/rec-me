import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ILead } from 'src/lead/model/lead';
import { TokenService } from '../token/token.service';

@Injectable()
export class GooglesheetsService {
  constructor(private readonly tokenService: TokenService) {}

  async saveToGoogleSheet(data: ILead) {
    const notifications = await this.tokenService.getNotifications();

    if (!notifications.googleToken) {
      throw new Error('Google token is not configured');
    }

    if (!notifications.googleSheetUrl) {
      throw new Error('Google Sheet URL is not configured');
    }

    const credentials = JSON.parse(notifications.googleToken);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const urlMatch = notifications.googleSheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (!urlMatch || !urlMatch[1]) {
      throw new Error('Invalid Google Sheet URL format');
    }
    const spreadsheetId = urlMatch[1];
    const serviceAccountEmail = credentials.client_email;

    const values = [
      [
        data.sub4,
        data.service,
        data.sub3,
        data.sub2,
        data.sub1,
        data.name,
        data.phone,
        data.email,
        data.pixel,
        data.verifyCodePhone,
        data.ip,
        data.user_agent,
        data.created_at instanceof Date
          ? data.created_at.toISOString()
          : data.created_at,
      ],
    ];

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'sheet',
        valueInputOption: 'RAW',
        requestBody: { values },
      });

      console.log('Data saved successfully!');
    } catch (error) {
      if (error.code === 404) {
        throw new Error(
          `Spreadsheet not found or access denied. Please ensure:\n` +
            `1. The spreadsheet ID is correct: ${spreadsheetId}\n` +
            `2. The spreadsheet is shared with the service account: ${serviceAccountEmail}\n` +
            `3. The sheet name "Sheet1" exists in the spreadsheet`,
        );
      }
      throw error;
    }
  }

  async testGoogleSheet(googleToken: string, googleSheetUrl: string) {
    const credentials = JSON.parse(googleToken);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const urlMatch = googleSheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (!urlMatch || !urlMatch[1]) {
      throw new Error('Invalid Google Sheet URL format');
    }
    const spreadsheetId = urlMatch[1];

    try {
      const response = await sheets.spreadsheets.get({
        spreadsheetId,
      });

      const mockData: ILead = {
        sub4: 'Test Sub4',
        service: 'Test Service',
        sub3: 'Test Sub3',
        sub2: 'Test Sub2',
        sub1: 'Test Sub1',
        name: 'Test User',
        phone: '+1234567890',
        email: 'test@example.com',
        pixel: 'test-pixel',
        verifyCodePhone: '1234',
        ip: '127.0.0.1',
        user_agent: 'Test User Agent',
        created_at: new Date(),
      };

      const values = [
        [
          mockData.sub4,
          mockData.service,
          mockData.sub3,
          mockData.sub2,
          mockData.sub1,
          mockData.name,
          mockData.phone,
          mockData.email,
          mockData.pixel,
          mockData.verifyCodePhone,
          mockData.ip,
          mockData.user_agent,
          mockData.created_at.toISOString(),
        ],
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'sheet',
        valueInputOption: 'RAW',
        requestBody: { values },
      });

      return {
        success: true,
        spreadsheetId,
        title: response.data.properties?.title,
        serviceAccountEmail: credentials.client_email,
        message: 'Successfully connected and test data saved to Google Sheets',
      };
    } catch (error) {
      if (error.code === 404) {
        throw new Error(
          `Spreadsheet not found or access denied. Please ensure:\n` +
            `1. The spreadsheet ID is correct: ${spreadsheetId}\n` +
            `2. The spreadsheet is shared with the service account: ${credentials.client_email}\n` +
            `3. The sheet name "sheet" exists in the spreadsheet`,
        );
      }
      throw error;
    }
  }
}
