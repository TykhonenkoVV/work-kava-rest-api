import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateHotDogsDto } from 'src/hot-dogs/dtos/create-hot-dogs.dto';
import { UpdateHotDogsDto } from 'src/hot-dogs/dtos/update-hot-dogs.dto';
import { HotDogsService } from 'src/hot-dogs/services/hot-dogs/hot-dogs.service';

@Controller('api/hotdogs')
export class HotDogsController {
  constructor(private hotDogsServices: HotDogsService) {}
  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createHotDogs(
    @Body() createHotDogsDto: CreateHotDogsDto,
    @Req() req: Request,
  ) {
    const owner = req.user['sub'];
    return this.hotDogsServices.createHotDogs(owner, createHotDogsDto);
  }

  @Get()
  getHotDogs() {
    return this.hotDogsServices.getHotDogs();
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateHotDogs(
    @Param('id') id: string,
    @Body() updateHotDogsDto: UpdateHotDogsDto,
  ) {
    return this.hotDogsServices.updateHotDogs(id, updateHotDogsDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  deleteHotDogs(@Param('id') id: string) {
    return this.hotDogsServices.deleteHotdogs(id);
  }
}
