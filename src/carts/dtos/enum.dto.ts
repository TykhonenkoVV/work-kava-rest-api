import { IsNotEmpty, IsNumber } from 'class-validator';

export class EnumDto {
  @IsNotEmpty()
  @IsNumber()
  en: number;

  @IsNotEmpty()
  @IsNumber()
  de: number;

  @IsNotEmpty()
  @IsNumber()
  ua: number;
}
