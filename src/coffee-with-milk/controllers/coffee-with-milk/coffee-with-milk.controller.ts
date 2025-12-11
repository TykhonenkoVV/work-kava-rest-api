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
import { CreateCoffeeWithMilkDto } from 'src/coffee-with-milk/dtos/create-coffe-with-milk.dto';
import { UpdateCoffeeWithMilkDto } from 'src/coffee-with-milk/dtos/update-coffe-with-milk.dto';
import { CoffeeWithMilkService } from 'src/coffee-with-milk/services/coffee-with-milk/coffee-with-milk.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import * as fs from 'fs';
import { ImagesUrl } from 'src/common/helpers/interfaces';

@Controller('api/coffee-with-milk')
export class CoffeeWithMilkController {
  constructor(
    private coffeeWithMilkServices: CoffeeWithMilkService,
    private cloudinaryServices: CloudinaryService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createCoffeeWithMilk(
    @Body() createCoffeeWithMilkDto: CreateCoffeeWithMilkDto,
    @Req() req: Request,
  ) {
    const owner = req.user['sub'];
    return this.coffeeWithMilkServices.createCoffeeWithMilk(
      owner,
      createCoffeeWithMilkDto,
    );
  }

  @Get('all')
  getAllCoffeeWithMilk() {
    return this.coffeeWithMilkServices.getAllCoffeeWithMilk();
  }

  @Get()
  getCoffeeWithMilk() {
    return this.coffeeWithMilkServices.getCoffeeWithMilk();
  }

  @Get(':id')
  getCoffeeWithMilkById(@Param('id') id: string) {
    return this.coffeeWithMilkServices.getCoffeeWithMilkById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateCoffeeWithMilk(
    @Param('id') id: string,
    @Body() updateCoffeeWithMilkDto: UpdateCoffeeWithMilkDto,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.coffeeWithMilkServices.updateCoffeeWithMilk(
      id,
      updateCoffeeWithMilkDto,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteCoffeeWithMilk(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.coffeeWithMilkServices.deleteCoffeeWithMilk(id);
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
        'workkava/cafe/coffee-with-milk',
        470,
        260,
      );
      const img2x = await this.cloudinaryServices.uploadImage(
        `${id}_2x`,
        files?.img[0]?.path,
        'workkava/cafe/coffee-with-milk',
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
        'workkava/cafe/coffee-with-milk-webp',
        470,
        260,
      );
      const webpImg2x = await this.cloudinaryServices.uploadImage(
        `${id}_2x`,
        files?.webpImg[0]?.path,
        'workkava/cafe/coffee-with-milk-webp',
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

    const data = await this.coffeeWithMilkServices.updateCoffeeWithMilk(
      id,
      payload,
    );

    return data;
  }
}
