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
import { CreateBurgersDto } from 'src/burgers/dtos/create-burgers.dto';
import { UpdateBurgersDto } from 'src/burgers/dtos/update-burgers.dto';
import { BurgersService } from 'src/burgers/services/burgers/burgers.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('api/burgers')
export class BurgersController {
  constructor(private burgersServices: BurgersService) {}
  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createBurgers(
    @Body() createBurgersDto: CreateBurgersDto,
    @Req() req: Request,
  ) {
    const owner = req.user['sub'];
    return this.burgersServices.createBurgers(owner, createBurgersDto);
  }

  @Get()
  getBurgers() {
    return this.burgersServices.getBurgers();
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateBurgers(
    @Param('id') id: string,
    @Body() updateBurgersDto: UpdateBurgersDto,
  ) {
    return this.burgersServices.updateBurgers(id, updateBurgersDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteBurgers(@Param('id') id: string) {
    return this.burgersServices.deleteBurger(id);
  }
}
