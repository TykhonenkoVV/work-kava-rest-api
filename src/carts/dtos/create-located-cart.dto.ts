import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocaledCartDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
