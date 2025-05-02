import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsString()
  avatarURL?: string;

  @IsOptional()
  @IsString()
  avatarURLsmall?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
