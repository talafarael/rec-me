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
  
  @IsString()
  @IsOptional()
  verifyCodePhone: string;

  @IsString()
  @IsOptional()
  field1?: string;

  @IsString()
  @IsOptional()
  field2?: string;

  @IsString()
  @IsOptional()
  field3?: string;
}
