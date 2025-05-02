import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBurgersDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsArray()
  price_standart: number[];

  @IsNotEmpty()
  @Type(() => Number)
  @IsArray()
  price_double: number[];

  @IsNotEmpty()
  @IsString()
  image: string;
}
