import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { SendpluseModule } from 'src/sendpluse/sendpluse.module';
import { TelegramModule } from 'src/telegram/telegram.module';
import { GooglesheetsModule } from 'src/googlesheets/googlesheets.module';
import { LeadformConfigModule } from 'src/leadform-config/leadform-config.module';

@Module({
  imports: [SendpluseModule, TelegramModule, GooglesheetsModule, LeadformConfigModule],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule { }
