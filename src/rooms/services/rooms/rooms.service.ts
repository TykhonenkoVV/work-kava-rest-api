import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { CreateRoomDto } from 'src/rooms/dtos/create-room.dto';
import { UpdateRoomDto } from 'src/rooms/dtos/update-room.dto';
import { Room } from 'src/rooms/schemas/rooms.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    private cloudinaryServices: CloudinaryService,
  ) {}

  async createRoom(owner: string, createRoomDto: CreateRoomDto) {
    const isMatch = await this.roomModel.findOne({
      en: { title: createRoomDto.en.title },
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newRoom = await new this.roomModel({
      owner,
      ...createRoomDto,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      room: newRoom,
    };
  }

  async getAllRooms() {
    const roomsArr = await this.roomModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      rooms: roomsArr,
    };
  }

  async getRooms() {
    const roomsArr = await this.roomModel.find({ archived: false }, null, {
      select: '-owner -createdAt -updatedAt',
    });
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      rooms: roomsArr,
    };
  }

  async getRoomById(id: string) {
    const result = await this.roomModel
      .findById(id, null, { select: '-owner -createdAt -updatedAt' })
      .exec();
    if (result === null) return false;
    else return result;
  }

  async updateRoom(id: string, updateRoomDto: UpdateRoomDto) {
    const isFinded = await this.getRoomById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const updatedRoom = await this.roomModel
      .findByIdAndUpdate(
        id,
        {
          index: updateRoomDto.index,
          archived: updateRoomDto.archived,
          imgURL: updateRoomDto.imgURL,
          webpImgURL: updateRoomDto.webpImgURL,
          $set: {
            'en.title': updateRoomDto?.en?.title,
            'en.price': updateRoomDto?.en?.price,
            'en.caption': updateRoomDto?.en?.caption,
            'de.title': updateRoomDto?.de?.title,
            'de.price': updateRoomDto?.de?.price,
            'de.caption': updateRoomDto?.de?.caption,
            'ua.title': updateRoomDto?.ua?.title,
            'ua.price': updateRoomDto?.ua?.price,
            'ua.caption': updateRoomDto?.ua?.caption,
          },
        },
        {
          new: true,
          select: '-owner -createdAt -updatedAt',
        },
      )
      .exec();

    return {
      status: 'update',
      code: 201,
      message: 'Product updated successfully',
      updated: updatedRoom,
    };
  }

  async deleteRoom(id: string) {
    const isFinded = await this.getRoomById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const deletedRoom = await this.roomModel.findByIdAndDelete({ _id: id });
    await this.cloudinaryServices.destroyImage(
      `workkava/coworking/${isFinded.en.title}/jpeg/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/coworking/${isFinded.en.title}/webp/${id}`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedRoom,
    };
  }
}
