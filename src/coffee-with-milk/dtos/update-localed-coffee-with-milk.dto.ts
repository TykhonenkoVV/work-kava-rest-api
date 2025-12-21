import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocaledCoffeeWithMilkDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  standart?: number;
}
