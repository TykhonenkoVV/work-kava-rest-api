import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocaledCafeDto } from 'src/common/dtos/create-located-cafe.dto';

export class CreateCoffeeWithMilkDto {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCafeDto)
  en: CreateLocaledCafeDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCafeDto)
  de: CreateLocaledCafeDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledCafeDto)
  ua: CreateLocaledCafeDto;

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
