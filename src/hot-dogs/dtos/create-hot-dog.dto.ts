import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocaledHotDogDto } from './create-located-hot-dog.dto';
import { Type } from 'class-transformer';

export class CreateHotDogDto {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledHotDogDto)
  en: CreateLocaledHotDogDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledHotDogDto)
  de: CreateLocaledHotDogDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledHotDogDto)
  ua: CreateLocaledHotDogDto;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
