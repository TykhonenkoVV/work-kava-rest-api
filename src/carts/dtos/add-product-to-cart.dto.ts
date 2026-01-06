import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocaledCartDto } from './create-located-cart.dto';

export class AddProductToCartDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;

  @IsOptional()
  @IsNumber()
  standart?: number;

  @IsOptional()
  @IsNumber()
  xl?: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  imgURL: string;

  @IsNotEmpty()
  @IsString()
  webpImgURL: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCartDto)
  en: CreateLocaledCartDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCartDto)
  de: CreateLocaledCartDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCartDto)
  ua: CreateLocaledCartDto;
}
