import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLocaledCafeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  standart: number;
}
