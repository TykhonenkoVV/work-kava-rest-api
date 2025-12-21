import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocaledCoffeeClassicDto } from './create-localed-coffee-classic.dto';

export class CreateCoffeeClassicDto {
  @IsNotEmpty()
  @IsNumber()
  index?: number;

  @IsNotEmpty()
  @IsBoolean()
  archived?: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCoffeeClassicDto)
  en: CreateLocaledCoffeeClassicDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCoffeeClassicDto)
  de: CreateLocaledCoffeeClassicDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCoffeeClassicDto)
  ua: CreateLocaledCoffeeClassicDto;

  @IsNotEmpty()
  @IsNumber()
  coffee: number;

  @IsNotEmpty()
  @IsNumber()
  water: number;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
