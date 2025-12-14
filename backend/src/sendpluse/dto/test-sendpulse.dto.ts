import { IsString } from 'class-validator';

export class TestSendpulseDto {
  @IsString()
  sendpulseSecret: string;

  @IsString()
  sendpulseClientId: string;

  @IsString()
  sendpulseAddressBookId: string;
}

