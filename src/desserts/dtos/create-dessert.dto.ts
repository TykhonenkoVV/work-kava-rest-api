import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDessertDto {
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
  weight: number;

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
