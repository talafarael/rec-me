import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LeadformConfigService } from './leadform-config.service';
import { LeadformConfigController } from './leadform-config.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [LeadformConfigController],
  providers: [LeadformConfigService],
  exports: [LeadformConfigService],
})
export class LeadformConfigModule {}
