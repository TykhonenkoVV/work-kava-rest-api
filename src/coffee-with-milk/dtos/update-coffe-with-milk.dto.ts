import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCoffeeWithMilkDto {
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
  price_en?: number;

  @IsOptional()
  @IsNumber()
  price_de?: number;

  @IsOptional()
  @IsNumber()
  price_ua?: number;

  @IsOptional()
  @IsNumber()
  coffee?: number;

  @IsOptional()
  @IsNumber()
  water?: number;

  @IsOptional()
  @IsNumber()
  milk?: number;

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
