import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocaledRoom } from './create-located-room.dto';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledRoom)
  en: CreateLocaledRoom;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledRoom)
  de: CreateLocaledRoom;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocaledRoom)
  ua: CreateLocaledRoom;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
