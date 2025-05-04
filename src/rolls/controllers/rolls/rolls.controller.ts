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
import { CreateRollDto } from 'src/rolls/dtos/create-roll.dto';
import { UpdateRollDto } from 'src/rolls/dtos/update-roll.dto';
import { RollsService } from 'src/rolls/services/rolls/rolls.service';

@Controller('api/rolls')
export class RollsController {
  constructor(private rollsServices: RollsService) {}

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
}
