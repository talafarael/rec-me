import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { SendpluseModule } from 'src/sendpluse/sendpluse.module';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [SendpluseModule, TelegramModule],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule { }
