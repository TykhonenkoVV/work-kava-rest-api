import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocaledRoll } from './create-located-roll.dto';
import { Type } from 'class-transformer';

export class CreateRollDto {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledRoll)
  en: CreateLocaledRoll;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledRoll)
  de: CreateLocaledRoll;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledRoll)
  ua: CreateLocaledRoll;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
