import { IsString, IsOptional, IsEmail } from 'class-validator';

export class SendpulseSendLeadDto {
  @IsString()
  @IsOptional()
  sub4: string;

  @IsString()
  @IsOptional()
  service: string;

  @IsString()
  @IsOptional()
  sub3: string;

  @IsString()
  @IsOptional()
  sub2: string;

  @IsString()
  @IsOptional()
  sub1: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  pixel: string;
}
