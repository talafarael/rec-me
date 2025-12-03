import { Module } from '@nestjs/common';
import { SendpluseService } from './sendpluse.service';
import { SendpluseController } from './sendpluse.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [SendpluseController],
  providers: [SendpluseService],
  exports: [SendpluseService],
})
export class SendpluseModule {}
