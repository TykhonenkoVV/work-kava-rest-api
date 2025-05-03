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
import { CreateCoffeeClassicDto } from 'src/coffee-classic/dtos/create-coffee-classic.dto';
import { UpdateCoffeeClassicDto } from 'src/coffee-classic/dtos/update-coffee-classic.dto';
import { CoffeeClassicService } from 'src/coffee-classic/services/coffee-classic/coffee-classic.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('api/coffeeclassics')
export class CoffeeClassicController {
  constructor(private caffeeClassicServices: CoffeeClassicService) {}
  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createCoffeeClassic(
    @Body() createCaffeClaccicdDto: CreateCoffeeClassicDto,
    @Req() req: Request,
  ) {
    const owner = req.user['sub'];
    return this.caffeeClassicServices.createCoffeeClassic(
      owner,
      createCaffeClaccicdDto,
    );
  }

  @Get()
  getCoffeeClassic() {
    return this.caffeeClassicServices.getCoffeeClassic();
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateCoffeeClassic(
    @Param('id') id: string,
    @Body() updateCoffeeClassicDto: UpdateCoffeeClassicDto,
  ) {
    return this.caffeeClassicServices.updateCoffeeClassic(
      id,
      updateCoffeeClassicDto,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteCoffeeClassic(@Param('id') id: string) {
    return this.caffeeClassicServices.deleteCoffeeClassic(id);
  }
}
