import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocaledCoffeeClassicDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  standart?: number;
}
