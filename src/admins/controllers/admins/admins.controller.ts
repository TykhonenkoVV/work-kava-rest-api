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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import mongoose from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import * as fs from 'fs';
import { AdminsService } from 'src/admins/srvices/admins/admins.service';
import { CreateAdminDto } from 'src/admins/dtos/CreateAdmin.dto';
import { UpdateAdminDto } from 'src/admins/dtos/UpdateAdmin.dto';

@Controller('api/admins')
export class AdminsController {
  constructor(
    private adminsServices: AdminsService,
    private cloudinaryServices: CloudinaryService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsServices.createAdmin(createAdminDto);
  }

  @Get()
  getUsers() {
    return this.adminsServices.getAdmins();
  }

  @Get(':id')
  getAdminById(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Admin not found.', 404);
    const findedAdmin = this.adminsServices.getAdminById(id);
    if (!findedAdmin) throw new HttpException('Admin not found.', 404);
    return findedAdmin;
  }

  @UseGuards(AccessTokenGuard)
  @Patch()
  @UsePipes(new ValidationPipe())
  updateAdmin(@Body() updateAdminDto: UpdateAdminDto, @Req() req: Request) {
    const adminId = req.user['sub'];
    const updatedAdmin = this.adminsServices.updateAdmin(
      adminId,
      updateAdminDto,
    );
    if (!updatedAdmin) throw new HttpException('Admin not found', 404);
    return updatedAdmin;
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.adminsServices.deleteAdmin(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('avatars')
  @UseInterceptors(FileInterceptor('avatarURL'))
  async uploadAvatar(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const id = req.user['sub'];
    const avatar = await this.cloudinaryServices.uploadAvatar(
      id,
      file.path,
      'workkava/adminsavatars',
      400,
    );

    await this.adminsServices.updateAdmin(id, {
      avatarURL: `v${avatar.version}/${avatar.public_id}`,
    });

    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });

    return {
      avatarURL: avatar.public_id,
    };
  }
}
