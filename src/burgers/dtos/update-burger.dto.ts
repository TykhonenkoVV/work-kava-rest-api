import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateLocaledFastfoodDto } from 'src/common/dtos/update-located-fastfood.dto';

export class UpdateBurgerDto {
  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledFastfoodDto)
  en?: UpdateLocaledFastfoodDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledFastfoodDto)
  de?: UpdateLocaledFastfoodDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledFastfoodDto)
  ua?: UpdateLocaledFastfoodDto;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
