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
import { CreateRollsDto } from 'src/rolls/dtos/create-rolls.dto';
import { UpdateRollsDto } from 'src/rolls/dtos/update-rolls.dto';
import { RollsService } from 'src/rolls/services/rolls/rolls.service';

@Controller('api/rolls')
export class RollsController {
  constructor(private rollsServices: RollsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createRolls(@Body() createRollsDto: CreateRollsDto, @Req() req: Request) {
    const owner = req.user['sub'];
    return this.rollsServices.createRolls(owner, createRollsDto);
  }

  @Get()
  getRolls() {
    return this.rollsServices.getRolls();
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateRolls(@Param('id') id: string, @Body() updateRollsDto: UpdateRollsDto) {
    return this.rollsServices.updateRolls(id, updateRollsDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteRolls(@Param('id') id: string) {
    return this.rollsServices.deleteRolls(id);
  }
}
