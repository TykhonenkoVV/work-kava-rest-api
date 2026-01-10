import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateLocaledRoom } from './update-located-room.dto';

export class UpdateRoomDto {
  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledRoom)
  en?: UpdateLocaledRoom;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledRoom)
  de?: UpdateLocaledRoom;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocaledRoom)
  ua?: UpdateLocaledRoom;

  @IsOptional()
  @IsString()
  imgURL?: string;

  @IsOptional()
  @IsString()
  webpImgURL?: string;
}
