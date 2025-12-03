import { Controller } from '@nestjs/common';
import { SendpluseService } from './sendpluse.service';

@Controller('sendpluse')
export class SendpluseController {
  constructor(private readonly sendpluseService: SendpluseService) {}
}
