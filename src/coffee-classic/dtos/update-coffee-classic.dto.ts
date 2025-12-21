import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateLocaledCoffeeClassicDto } from './update-localed-coffee-classic.dto';

export class UpdateCoffeeClassicDto {
  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCoffeeClassicDto)
  en?: UpdateLocaledCoffeeClassicDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCoffeeClassicDto)
  de?: UpdateLocaledCoffeeClassicDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCoffeeClassicDto)
  ua?: UpdateLocaledCoffeeClassicDto;

  @IsOptional()
  @IsNumber()
  coffee?: number;

  @IsOptional()
  @IsNumber()
  water?: number;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
