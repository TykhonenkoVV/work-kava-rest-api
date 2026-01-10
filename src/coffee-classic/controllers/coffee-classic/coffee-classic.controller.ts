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
import { CreateCoffeeClassicDto } from 'src/coffee-classic/dtos/create-coffee-classic.dto';
import { UpdateCoffeeClassicDto } from 'src/coffee-classic/dtos/update-coffee-classic.dto';
import { CoffeeClassicService } from 'src/coffee-classic/services/coffee-classic/coffee-classic.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import * as fs from 'fs';
import { ImagesUrl } from 'src/common/helpers/interfaces';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('api/coffee-classic')
export class CoffeeClassicController {
  constructor(
    private caffeeClassicServices: CoffeeClassicService,
    private cloudinaryServices: CloudinaryService,
  ) {}

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.admin, Role.employee, Role.moderator)
  @Post()
  @UsePipes(new ValidationPipe())
  createCoffeeClassic(
    @Body() createCaffeClaccicdDto: CreateCoffeeClassicDto,
    @Req() req: Request,
  ) {
    const owner = req.user['sub'];
    return this.caffeeClassicServices.createCoffeeClassic(
      owner,
      createCaffeClaccicdDto,
    );
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.admin, Role.employee, Role.moderator, Role.employer)
  @Get('all')
  getAllCoffeeClassic() {
    return this.caffeeClassicServices.getAllCoffeeClassic();
  }

  @Get()
  getCoffeeClassic() {
    return this.caffeeClassicServices.getCoffeeClassic();
  }

  @Get(':id')
  getCoffeeClassicById(@Param('id') id: string) {
    return this.caffeeClassicServices.getCoffeeClassicById(id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.admin, Role.employee, Role.moderator)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateCoffeeClassic(
    @Param('id') id: string,
    @Body() updateCoffeeClassicDto: UpdateCoffeeClassicDto,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.caffeeClassicServices.updateCoffeeClassic(
      id,
      updateCoffeeClassicDto,
    );
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.admin, Role.employee, Role.moderator)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  deleteCoffeeClassic(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.caffeeClassicServices.deleteCoffeeClassic(id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.admin, Role.employee, Role.moderator)
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
        'workkava/cafe/coffee-classic/png',
        470,
        260,
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
        'workkava/cafe/coffee-classic/webp',
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

    const data = await this.caffeeClassicServices.updateCoffeeClassic(
      id,
      payload,
    );

    return data;
  }
}
