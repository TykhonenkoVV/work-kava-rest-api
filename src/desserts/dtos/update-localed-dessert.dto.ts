import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocaledDessertDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  standart?: number;
}
