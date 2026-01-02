import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLocaledFastfoodDto } from 'src/common/dtos/create-located-fastfood.dto';

export class CreateRollDto {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledFastfoodDto)
  en: CreateLocaledFastfoodDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledFastfoodDto)
  de: CreateLocaledFastfoodDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledFastfoodDto)
  ua: CreateLocaledFastfoodDto;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
