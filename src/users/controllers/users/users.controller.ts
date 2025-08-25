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
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/srvices/users/users.service';
import * as fs from 'fs';

@Controller('api/users')
export class UsersController {
  constructor(
    private usersServices: UsersService,
    private cloudinaryServices: CloudinaryService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersServices.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersServices.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('User not found.', 404);
    const findedUser = this.usersServices.getUserById(id);
    if (!findedUser) throw new HttpException('User not found.', 404);
    return findedUser;
  }

  @UseGuards(AccessTokenGuard)
  @Patch()
  @UsePipes(new ValidationPipe())
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const userId = req.user['sub'];
    const updatedUser = this.usersServices.updateUser(userId, updateUserDto);
    if (!updatedUser) throw new HttpException('User not found', 404);
    return updatedUser;
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersServices.deleteUser(id);
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
      250,
    );
    const avatarSmall = await this.cloudinaryServices.uploadAvatar(
      `${id}_small`,
      file.path,
      32,
    );

    await this.usersServices.updateUser(id, {
      avatarURL: avatar.secure_url,
      avatarURLsmall: avatarSmall.secure_url,
    });

    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });

    return {
      avatarURL: avatar.secure_url,
      avatarURLsmall: avatarSmall.secure_url,
    };
  }
}
