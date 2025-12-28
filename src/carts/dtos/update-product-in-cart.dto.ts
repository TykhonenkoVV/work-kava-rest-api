import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PriceDto } from './price.dto';

export class UpdateProductInCartDto {
  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @IsNumber()
  standart?: number;

  @IsOptional()
  @IsNumber()
  xl?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => PriceDto)
  price?: PriceDto;
}
