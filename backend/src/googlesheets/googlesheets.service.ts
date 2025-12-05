import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import { ILead } from 'src/lead/model/lead';

@Injectable()
export class GooglesheetsService {
  async saveToGoogleSheet(data: ILead) {
    const pathJson = path.join(
      process.cwd(),
      'gen-lang-client-0832188936-be589c7ed491.json',
    );

    const credentials = JSON.parse(fs.readFileSync(pathJson, 'utf8'));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = '1EOdZCdBeC0pMTKNEaXK5aGfo827y-lrIm7UrJYI-uNQ';
    const serviceAccountEmail = credentials.client_email;

    // Convert ILead object to array of values for Google Sheets
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
}
