import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLocaledFastfoodDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  standart: number;

  @IsNotEmpty()
  @IsNumber()
  xl: number;

  @IsNotEmpty()
  @IsString()
  ingredients: string;
}
