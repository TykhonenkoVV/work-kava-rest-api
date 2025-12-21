import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocaledDessertDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  standart: number;
}
