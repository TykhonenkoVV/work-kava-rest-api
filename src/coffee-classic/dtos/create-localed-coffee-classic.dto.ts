import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocaledCoffeeClassicDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  standart: number;
}
