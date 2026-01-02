import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocaledCafeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  standart?: number;
}
