import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProductInCartDto {
  @IsOptional()
  @IsNumber()
  standart?: number;

  @IsOptional()
  @IsNumber()
  xl?: number;
}
