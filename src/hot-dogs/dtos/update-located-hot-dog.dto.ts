import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocaledHotDogDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  standart?: number;

  @IsOptional()
  @IsNumber()
  xl?: number;

  @IsOptional()
  @IsString()
  ingredients?: string;
}
