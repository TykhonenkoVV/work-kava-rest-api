import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddProductToCartDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsOptional()
  @IsNumber()
  standart?: number;

  @IsOptional()
  @IsNumber()
  xl?: number;

  @IsNotEmpty()
  @IsString()
  category: string;
}
