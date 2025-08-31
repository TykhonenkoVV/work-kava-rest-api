import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBurgerDto {
  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

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
  price_standart_en?: number;

  @IsOptional()
  @IsNumber()
  price_double_en?: number;

  @IsOptional()
  @IsNumber()
  price_standart_de?: number;

  @IsOptional()
  @IsNumber()
  price_double_de?: number;

  @IsOptional()
  @IsNumber()
  price_standart_ua?: number;

  @IsOptional()
  @IsNumber()
  price_double_ua?: number;

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
