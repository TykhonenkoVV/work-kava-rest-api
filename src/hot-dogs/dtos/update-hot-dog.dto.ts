import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateLocaledHotDogDto } from './update-located-hot-dog.dto';
import { Type } from 'class-transformer';

export class UpdateHotDogDto {
  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledHotDogDto)
  en?: UpdateLocaledHotDogDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledHotDogDto)
  de?: UpdateLocaledHotDogDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledHotDogDto)
  ua?: UpdateLocaledHotDogDto;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
