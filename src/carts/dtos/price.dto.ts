import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { EnumDto } from './enum.dto';

export class PriceDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => EnumDto)
  standart?: EnumDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EnumDto)
  xl?: EnumDto;
}
