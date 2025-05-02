import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCoffeeWithMilkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsArray()
  price: number[];

  @IsNotEmpty()
  @IsNumber()
  coffee: number;

  @IsNotEmpty()
  @IsNumber()
  water: number;

  @IsNotEmpty()
  @IsNumber()
  milk: number;

  @IsNotEmpty()
  @IsString()
  image: string;
}
