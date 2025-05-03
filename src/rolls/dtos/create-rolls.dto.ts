import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRollsDto {
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
  price_xl: number[];

  @IsNotEmpty()
  @IsString()
  image: string;
}
