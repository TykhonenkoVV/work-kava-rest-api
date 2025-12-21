import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateLocaledRollDto } from './update-located-roll.dto';
import { Type } from 'class-transformer';

export class UpdateRollDto {
  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledRollDto)
  en?: UpdateLocaledRollDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledRollDto)
  de?: UpdateLocaledRollDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledRollDto)
  ua?: UpdateLocaledRollDto;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
