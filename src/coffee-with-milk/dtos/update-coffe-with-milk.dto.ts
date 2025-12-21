import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateLocaledCoffeeWithMilkDto } from './update-localed-coffee-with-milk.dto';
import { Type } from 'class-transformer';

export class UpdateCoffeeWithMilkDto {
  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCoffeeWithMilkDto)
  en?: UpdateLocaledCoffeeWithMilkDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCoffeeWithMilkDto)
  de?: UpdateLocaledCoffeeWithMilkDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCoffeeWithMilkDto)
  ua?: UpdateLocaledCoffeeWithMilkDto;

  @IsOptional()
  @IsNumber()
  coffee?: number;

  @IsOptional()
  @IsNumber()
  water?: number;

  @IsOptional()
  @IsNumber()
  milk?: number;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
