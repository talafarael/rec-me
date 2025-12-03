import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { SendpluseModule } from 'src/sendpluse/sendpluse.module';

@Module({
  imports: [SendpluseModule],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule {}
