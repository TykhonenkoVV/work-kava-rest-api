import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateLocaledBurgerDto } from './update-located-burger.dto';

export class UpdateBurgerDto {
  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledBurgerDto)
  en?: UpdateLocaledBurgerDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledBurgerDto)
  de?: UpdateLocaledBurgerDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledBurgerDto)
  ua?: UpdateLocaledBurgerDto;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
