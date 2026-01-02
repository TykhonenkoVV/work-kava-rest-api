import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { CreateRoomDto } from 'src/rooms/dtos/create-room.dto';
import { Room } from 'src/rooms/schemas/rooms.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    // private cloudinaryServices: CloudinaryService,
  ) {}

  async createRoom(owner: string, createRoomDto: CreateRoomDto) {
    const isMatch = await this.roomModel.findOne({
      en: { title: createRoomDto.en.title },
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newRoll = await new this.roomModel({
      owner,
      ...createRoomDto,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      roll: newRoll,
    };
  }
}
