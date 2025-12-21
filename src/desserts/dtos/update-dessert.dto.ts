import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateLocaledDessertDto } from './update-localed-dessert.dto';
import { Type } from 'class-transformer';

export class UpdateDessertDto {
  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledDessertDto)
  en?: UpdateLocaledDessertDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledDessertDto)
  de?: UpdateLocaledDessertDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledDessertDto)
  ua?: UpdateLocaledDessertDto;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
