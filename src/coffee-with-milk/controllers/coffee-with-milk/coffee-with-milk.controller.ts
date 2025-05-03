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
import { CreateCoffeeWithMilkDto } from 'src/coffee-with-milk/dtos/create-coffe-with-milk.dto';
import { UpdateCoffeeWithMilkDto } from 'src/coffee-with-milk/dtos/update-coffe-with-milk.dto';
import { CoffeeWithMilkService } from 'src/coffee-with-milk/services/coffee-with-milk/coffee-with-milk.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('api/coffeewithmilks')
export class CoffeeWithMilkController {
  constructor(private coffeeWithMilkServices: CoffeeWithMilkService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  createCoffeeWithMilk(
    @Body() createCoffeeWithMilkdDto: CreateCoffeeWithMilkDto,
    @Req() req: Request,
  ) {
    const owner = req.user['sub'];
    return this.coffeeWithMilkServices.createCoffeeWithMilk(
      owner,
      createCoffeeWithMilkdDto,
    );
  }

  @Get()
  getCoffeeWithMilk() {
    return this.coffeeWithMilkServices.getCoffeeWithMilk();
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateCoffeeWithMilk(
    @Param('id') id: string,
    @Body() updateCoffeeWithMilkDto: UpdateCoffeeWithMilkDto,
  ) {
    return this.coffeeWithMilkServices.updateCoffeeWithMilk(
      id,
      updateCoffeeWithMilkDto,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteCoffeeWithMilk(@Param('id') id: string) {
    return this.coffeeWithMilkServices.deleteCoffeeWithMilk(id);
  }
}
