import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocaledCoffeeWithMilkDto } from './create-localed-coffee-with-milk.dto';

export class CreateCoffeeWithMilkDto {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCoffeeWithMilkDto)
  en: CreateLocaledCoffeeWithMilkDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCoffeeWithMilkDto)
  de: CreateLocaledCoffeeWithMilkDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCoffeeWithMilkDto)
  ua: CreateLocaledCoffeeWithMilkDto;

  @IsNotEmpty()
  @IsNumber()
  coffee: number;

  @IsNotEmpty()
  @IsNumber()
  water: number;

  @IsNotEmpty()
  @IsNumber()
  milk: number;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
