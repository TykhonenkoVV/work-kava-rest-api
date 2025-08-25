import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCoffeeClassicDto {
  @IsNotEmpty()
  @IsString()
  title_en: string;

  @IsNotEmpty()
  @IsString()
  title_de: string;

  @IsNotEmpty()
  @IsString()
  title_ua: string;

  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @IsNumber()
  price_en: number;

  @IsNotEmpty()
  @IsNumber()
  price_de: number;

  @IsNotEmpty()
  @IsNumber()
  price_ua: number;

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
  img2xURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;

  @IsOptional()
  @IsString()
  webpImg2xURL?: string;
}
