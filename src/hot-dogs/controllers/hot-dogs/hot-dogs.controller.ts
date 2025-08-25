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
import { Request } from 'express';
import mongoose from 'mongoose';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateHotDogDto } from 'src/hot-dogs/dtos/create-hot-dog.dto';
import { UpdateHotDogDto } from 'src/hot-dogs/dtos/update-hot-dog.dto';
import { HotDogsService } from 'src/hot-dogs/services/hot-dogs/hot-dogs.service';
import * as fs from 'fs';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/hotdogs')
export class HotDogsController {
  constructor(
    private hotDogsServices: HotDogsService,
    private cloudinaryServices: CloudinaryService,
  ) {}
  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createHotDog(@Body() createHotDogDto: CreateHotDogDto, @Req() req: Request) {
    const owner = req.user['sub'];
    return this.hotDogsServices.createHotDog(owner, createHotDogDto);
  }

  @Get()
  getHotDogs() {
    return this.hotDogsServices.getHotDogs();
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateHotDog(
    @Param('id') id: string,
    @Body() updateHotDogDto: UpdateHotDogDto,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.hotDogsServices.updateHotDog(id, updateHotDogDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  deleteHotDogs(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.hotDogsServices.deleteHotdog(id);
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

    const img = await this.cloudinaryServices.uploadImage(
      id,
      files?.img[0]?.path,
      'workkava/fastfood/hot-dogs',
      470,
      260,
    );
    const img2x = await this.cloudinaryServices.uploadImage(
      `${id}_2x`,
      files?.img[0]?.path,
      'workkava/fastfood/hot-dogs',
      null,
      null,
    );
    const webpImg = await this.cloudinaryServices.uploadImage(
      id,
      files?.webpImg[0]?.path,
      'workkava/fastfood/hot-dogs-webp',
      470,
      260,
    );
    const webpImg2x = await this.cloudinaryServices.uploadImage(
      `${id}_2x`,
      files?.webpImg[0]?.path,
      'workkava/fastfood/hot-dogs-webp',
      null,
      null,
    );

    const data = await this.hotDogsServices.updateHotDog(id, {
      imgURL: img.secure_url,
      img2xURL: img2x.secure_url,
      webpImgURL: webpImg.secure_url,
      webpImg2xURL: webpImg2x.secure_url,
    });

    fs.unlink(files?.img[0]?.path, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
    fs.unlink(files?.webpImg[0]?.path, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });

    return data;
  }
}
