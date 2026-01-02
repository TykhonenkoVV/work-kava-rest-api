import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocaledRoom {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  caption: number;
}
