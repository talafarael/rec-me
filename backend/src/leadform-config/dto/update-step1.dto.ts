import { IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';

export class UpdateStep1Dto {
  @IsNumber()
  @Min(0)
  @Max(3)
  @IsOptional()
  fieldsCount?: number;

  @IsString()
  @IsOptional()
  field1Placeholder?: string;

  @IsString()
  @IsOptional()
  field2Placeholder?: string;

  @IsString()
  @IsOptional()
  field3Placeholder?: string;
}
