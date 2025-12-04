import { IsPhoneNumber } from 'class-validator';

export class SendVerifyCodeDto {
  @IsPhoneNumber()
  phone: string;
}
