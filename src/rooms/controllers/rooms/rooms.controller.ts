import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import mongoose from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ImagesUrl } from 'src/common/helpers/interfaces';
import { CreateRoomDto } from 'src/rooms/dtos/create-room.dto';
import { UpdateRoomDto } from 'src/rooms/dtos/update-room.dto';
import { RoomsService } from 'src/rooms/services/rooms/rooms.service';
import * as fs from 'fs';

@Controller('api/rooms')
export class RoomsController {
  constructor(
    private roomsServices: RoomsService,
    private cloudinaryServices: CloudinaryService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createRoom(@Body() createRoomDto: CreateRoomDto, @Req() req: Request) {
    const owner = req.user['sub'];
    return this.roomsServices.createRoom(owner, createRoomDto);
  }

  @Get('all')
  getAllRooms() {
    return this.roomsServices.getAllRooms();
  }

  @Get()
  getRooms() {
    return this.roomsServices.getRooms();
  }

  @Get(':id')
  getRoomById(@Param('id') id: string) {
    return this.roomsServices.getRoomById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateRolls(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.roomsServices.updateRoom(id, updateRoomDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteRoom(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.roomsServices.deleteRoom(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('images')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'img', maxCount: 1 },
      { name: 'webpImg', maxCount: 1 },
    ]),
  )
  async uploadImage(
    @Req() req: Request,
    @UploadedFiles()
    files: {
      img?: Express.Multer.File[];
      webpImg?: Express.Multer.File[];
    },
  ) {
    const id = req.body.id;

    const path = req.body.path;

    let payload: ImagesUrl = {};

    if (files.img) {
      const img = await this.cloudinaryServices.uploadImage(
        path,
        files?.img[0]?.path,
        `workkava/coworking/${path}/jpeg`,
        null,
        null,
      );
      payload.imgURL = `v${img.version}/${img.public_id}`;

      fs.unlink(files?.img[0]?.path, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });
    }
    if (files.webpImg) {
      const webpImg = await this.cloudinaryServices.uploadImage(
        path,
        files?.webpImg[0]?.path,
        `workkava/coworking/${path}/webp`,
        null,
        null,
      );
      payload.webpImgURL = `v${webpImg.version}/${webpImg.public_id}`;

      fs.unlink(files?.webpImg[0]?.path, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });
    }

    const data = await this.roomsServices.updateRoom(id, payload);

    return data;
  }
}
