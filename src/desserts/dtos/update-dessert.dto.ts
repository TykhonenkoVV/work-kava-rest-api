import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateLocaledCafeDto } from 'src/common/dtos/update-located-cafe.dto';

export class UpdateDessertDto {
  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCafeDto)
  en?: UpdateLocaledCafeDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCafeDto)
  de?: UpdateLocaledCafeDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCafeDto)
  ua?: UpdateLocaledCafeDto;

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
