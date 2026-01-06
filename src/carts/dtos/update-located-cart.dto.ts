import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLocaledCartDto {
  @IsOptional()
  @IsNumber()
  standart?: number;

  @IsOptional()
  @IsNumber()
  xl?: number;
}
