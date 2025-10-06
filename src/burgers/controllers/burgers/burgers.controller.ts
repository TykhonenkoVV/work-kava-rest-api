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
import { CreateBurgerDto } from 'src/burgers/dtos/create-burger.dto';
import { UpdateBurgerDto } from 'src/burgers/dtos/update-burger.dto';
import { BurgersService } from 'src/burgers/services/burgers/burgers.service';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import * as fs from 'fs';
import { ImagesUrl } from 'src/common/helpers/interfaces';

@Controller('api/burgers')
export class BurgersController {
  constructor(
    private burgersServices: BurgersService,
    private cloudinaryServices: CloudinaryService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createBurger(@Body() createBurgerDto: CreateBurgerDto, @Req() req: Request) {
    const owner = req.user['sub'];
    return this.burgersServices.createBurger(owner, createBurgerDto);
  }

  @Get('all')
  getAllBurgers() {
    return this.burgersServices.getAllBurgers();
  }

  @Get()
  getBurgers() {
    return this.burgersServices.getBurgers();
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateBurger(
    @Param('id') id: string,
    @Body() updateBurgerDto: UpdateBurgerDto,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.burgersServices.updateBurgers(id, updateBurgerDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteBurgers(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.burgersServices.deleteBurger(id);
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
        'workkava/fastfood/burgers',
        470,
        260,
      );
      const img2x = await this.cloudinaryServices.uploadImage(
        `${id}_2x`,
        files?.img[0]?.path,
        'workkava/fastfood/burgers',
        null,
        null,
      );
      payload.imgURL = img.secure_url;
      payload.img2xURL = img2x.secure_url;

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
        'workkava/fastfood/burgers-webp',
        470,
        260,
      );
      const webpImg2x = await this.cloudinaryServices.uploadImage(
        `${id}_2x`,
        files?.webpImg[0]?.path,
        'workkava/fastfood/burgers-webp',
        null,
        null,
      );
      payload.webpImgURL = webpImg.secure_url;
      payload.webpImg2xURL = webpImg2x.secure_url;

      fs.unlink(files?.webpImg[0]?.path, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });
    }

    const data = await this.burgersServices.updateBurgers(id, payload);

    return data;
  }
}
