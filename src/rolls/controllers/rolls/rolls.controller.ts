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
import { ImagesUrl } from 'src/common/helpers/interfaces';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('api/rolls')
export class RollsController {
  constructor(
    private rollsServices: RollsService,
    private cloudinaryServices: CloudinaryService,
  ) {}

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.admin, Role.employee, Role.moderator)
  @Post()
  @UsePipes(new ValidationPipe())
  createRolls(@Body() createRollDto: CreateRollDto, @Req() req: Request) {
    const owner = req.user['sub'];
    return this.rollsServices.createRoll(owner, createRollDto);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.admin, Role.employee, Role.moderator, Role.employer)
  @Get('all')
  getAllRolls() {
    return this.rollsServices.getAllRolls();
  }

  @Get()
  getRolls() {
    return this.rollsServices.getRolls();
  }

  @Get(':id')
  getRollById(@Param('id') id: string) {
    return this.rollsServices.getRollById(id);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.admin, Role.employee, Role.moderator)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateRolls(@Param('id') id: string, @Body() updateRollDto: UpdateRollDto) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.rollsServices.updateRoll(id, updateRollDto);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.admin, Role.employee, Role.moderator)
  @Delete(':id')
  deleteRolls(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.rollsServices.deleteRoll(id);
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
        'workkava/fastfood/rolls/png',
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
        'workkava/fastfood/rolls/webp',
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

    const data = await this.rollsServices.updateRoll(id, payload);

    return data;
  }
}
