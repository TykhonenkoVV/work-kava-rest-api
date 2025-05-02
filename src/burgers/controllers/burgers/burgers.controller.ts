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
  createBurgers(@Body() burgersDto: CreateBurgersDto, @Req() req: Request) {
    const owner = req.user['sub'];
    console.log(req.user);

    return this.burgersServices.createBurgers(owner, burgersDto);
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
    @Req() req: Request,
  ) {
    const owner = req.user['sub'];
    return this.burgersServices.updateBurgers(id, owner, updateBurgersDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteBurgers(@Param('id') id: string) {
    return this.burgersServices.deleteBurger(id);
  }
}
