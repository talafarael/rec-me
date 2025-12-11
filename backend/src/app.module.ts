import { Module } from '@nestjs/common';
import { TwilioModule } from './twilio/twilio.module';
import { SendpluseModule } from './sendpluse/sendpluse.module';
import { ConfigModule } from '@nestjs/config';
import { LeadModule } from './lead/lead.module';
import { TelegramModule } from './telegram/telegram.module';
import { GooglesheetsModule } from './googlesheets/googlesheets.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { LeadformConfigModule } from './leadform-config/leadform-config.module';
import { TokenModule } from './token/token.module';
import configuration from './config/configuration';

@Module({
  imports: [
    TwilioModule,
    SendpluseModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LeadModule,
    TelegramModule,
    GooglesheetsModule,
    AuthModule,
    DatabaseModule,
    LeadformConfigModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
