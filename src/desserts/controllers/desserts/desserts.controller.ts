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
import { CreateDessertDto } from 'src/desserts/dtos/create-dessert.dto';
import { UpdateDessertDto } from 'src/desserts/dtos/update-dessert.dto';
import { DessertsService } from 'src/desserts/services/desserts/desserts.service';
import * as fs from 'fs';
import { ImagesUrl } from 'src/common/helpers/interfaces';

@Controller('api/desserts')
export class DessertsController {
  constructor(
    private dessertsServices: DessertsService,
    private cloudinaryServices: CloudinaryService,
  ) {}
  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createDessert(
    @Body() createDessertDto: CreateDessertDto,
    @Req() req: Request,
  ) {
    const owner = req.user['sub'];
    return this.dessertsServices.createDessert(owner, createDessertDto);
  }

  @Get('all')
  getAllDesserts() {
    return this.dessertsServices.getAllDesserts();
  }

  @Get()
  getDesserts() {
    return this.dessertsServices.getDesserts();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getDessertById(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    console.log('GET IsValidId', isValidId);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.dessertsServices.getDessertById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateDessert(
    @Param('id') id: string,
    @Body() updateDessertDto: UpdateDessertDto,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.dessertsServices.updateDessert(id, updateDessertDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  deleteDessert(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.dessertsServices.deleteDessert(id);
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

    let payload: ImagesUrl = {};

    if (files.img) {
      const img = await this.cloudinaryServices.uploadImage(
        id,
        files?.img[0]?.path,
        'workkava/cafe/desserts/jpeg',
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
        id,
        files?.webpImg[0]?.path,
        'workkava/cafe/desserts/webp',
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

    const data = await this.dessertsServices.updateDessert(id, payload);

    return data;
  }
}
