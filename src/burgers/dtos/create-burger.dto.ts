import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBurgerDto {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;

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
  price_standart_en: number;

  @IsNotEmpty()
  @IsNumber()
  price_double_en: number;

  @IsNotEmpty()
  @IsNumber()
  price_standart_de: number;

  @IsNotEmpty()
  @IsNumber()
  price_double_de: number;

  @IsNotEmpty()
  @IsNumber()
  price_standart_ua: number;

  @IsNotEmpty()
  @IsNumber()
  price_double_ua: number;

  @IsNotEmpty()
  @IsString()
  ingredients_en: string;

  @IsNotEmpty()
  @IsString()
  ingredients_de: string;

  @IsNotEmpty()
  @IsString()
  ingredients_ua: string;

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
