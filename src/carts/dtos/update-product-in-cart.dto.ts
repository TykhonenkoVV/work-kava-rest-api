import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateLocaledCartDto } from './update-located-cart.dto';

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
  @IsNumber()
  count?: number;

  @IsOptional()
  @IsString()
  receipt?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCartDto)
  en?: UpdateLocaledCartDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCartDto)
  de?: UpdateLocaledCartDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledCartDto)
  ua?: UpdateLocaledCartDto;
}
