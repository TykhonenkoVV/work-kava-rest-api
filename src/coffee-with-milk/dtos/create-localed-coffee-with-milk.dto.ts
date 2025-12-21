import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocaledCoffeeWithMilkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  standart: number;
}
