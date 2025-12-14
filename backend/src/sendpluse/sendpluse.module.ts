import { Module } from '@nestjs/common';
import { SendpluseService } from './sendpluse.service';
import { SendpluseController } from './sendpluse.controller';
import { HttpModule } from '@nestjs/axios';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [HttpModule, TokenModule],
  controllers: [SendpluseController],
  providers: [SendpluseService],
  exports: [SendpluseService],
})
export class SendpluseModule {}
