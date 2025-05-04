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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import mongoose from 'mongoose';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateHotDogDto } from 'src/hot-dogs/dtos/create-hot-dog.dto';
import { UpdateHotDogDto } from 'src/hot-dogs/dtos/update-hot-dog.dto';
import { HotDogsService } from 'src/hot-dogs/services/hot-dogs/hot-dogs.service';

@Controller('api/hotdogs')
export class HotDogsController {
  constructor(private hotDogsServices: HotDogsService) {}
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
}
