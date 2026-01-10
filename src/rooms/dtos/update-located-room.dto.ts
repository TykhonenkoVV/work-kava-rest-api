import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocaledRoom {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  description?: number;
}
