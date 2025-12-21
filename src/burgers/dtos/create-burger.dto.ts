import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLocaledBurgerDto } from './create-located-burger.dto';

export class CreateBurgerDto {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledBurgerDto)
  en: CreateLocaledBurgerDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledBurgerDto)
  de: CreateLocaledBurgerDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledBurgerDto)
  ua: CreateLocaledBurgerDto;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
