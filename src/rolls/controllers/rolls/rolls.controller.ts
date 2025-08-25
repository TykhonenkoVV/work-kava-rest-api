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
import { CreateRollDto } from 'src/rolls/dtos/create-roll.dto';
import { UpdateRollDto } from 'src/rolls/dtos/update-roll.dto';
import { RollsService } from 'src/rolls/services/rolls/rolls.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import * as fs from 'fs';

@Controller('api/rolls')
export class RollsController {
  constructor(
    private rollsServices: RollsService,
    private cloudinaryServices: CloudinaryService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createRolls(@Body() createRollDto: CreateRollDto, @Req() req: Request) {
    const owner = req.user['sub'];
    return this.rollsServices.createRoll(owner, createRollDto);
  }

  @Get()
  getRolls() {
    return this.rollsServices.getRolls();
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateRolls(@Param('id') id: string, @Body() updateRollDto: UpdateRollDto) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.rollsServices.updateRoll(id, updateRollDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteRolls(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.rollsServices.deleteRoll(id);
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
      'workkava/fastfood/rolls',
      470,
      260,
    );
    const img2x = await this.cloudinaryServices.uploadImage(
      `${id}_2x`,
      files?.img[0]?.path,
      'workkava/fastfood/rolls',
      null,
      null,
    );
    const webpImg = await this.cloudinaryServices.uploadImage(
      id,
      files?.webpImg[0]?.path,
      'workkava/fastfood/rolls-webp',
      470,
      260,
    );
    const webpImg2x = await this.cloudinaryServices.uploadImage(
      `${id}_2x`,
      files?.webpImg[0]?.path,
      'workkava/fastfood/rolls-webp',
      null,
      null,
    );

    const data = await this.rollsServices.updateRoll(id, {
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
