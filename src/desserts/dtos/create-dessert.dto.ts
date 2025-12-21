import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocaledDessertDto } from './create-localed-dessert.dto';
import { Type } from 'class-transformer';

export class CreateDessertDto {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledDessertDto)
  en: CreateLocaledDessertDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledDessertDto)
  de: CreateLocaledDessertDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledDessertDto)
  ua: CreateLocaledDessertDto;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
