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
import { CreateDessertDto } from 'src/desserts/dtos/create-dessert.dto';
import { UpdateDessertDto } from 'src/desserts/dtos/update-dessert.dto';
import { DessertsService } from 'src/desserts/services/desserts/desserts.service';

@Controller('api/desserts')
export class DessertsController {
  constructor(private dessertsServices: DessertsService) {}
  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createDessert(
    @Body() createDessertDto: CreateDessertDto,
    @Req() req: Request,
  ) {
    const owner = req.user['sub'];
    return this.dessertsServices.createDessert(owner, createDessertDto);
  }

  @Get()
  getDesserts() {
    return this.dessertsServices.getDesserts();
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateDessert(
    @Param('id') id: string,
    @Body() updateDessertDto: UpdateDessertDto,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.dessertsServices.updateDessert(id, updateDessertDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteDessert(@Param() id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.dessertsServices.deleteDessert(id);
  }
}
