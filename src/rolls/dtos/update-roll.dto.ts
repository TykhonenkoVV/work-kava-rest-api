import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRollDto {
  @IsOptional()
  @IsString()
  title_en?: string;

  @IsOptional()
  @IsString()
  title_de?: string;

  @IsOptional()
  @IsString()
  title_ua?: string;

  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsNumber()
  price_standart_en?: number;

  @IsOptional()
  @IsNumber()
  price_xl_en?: number;

  @IsOptional()
  @IsNumber()
  price_standart_de?: number;

  @IsOptional()
  @IsNumber()
  price_xl_de?: number;

  @IsOptional()
  @IsNumber()
  price_standart_ua?: number;

  @IsOptional()
  @IsNumber()
  price_xl_ua?: number;

  @IsOptional()
  @IsString()
  ingredients_en?: string;

  @IsOptional()
  @IsString()
  ingredients_de?: string;

  @IsOptional()
  @IsString()
  ingredients_ua?: string;

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
