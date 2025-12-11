import {
  Body,
  Controller,
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
import { AddProductToCartDto } from 'src/carts/dtos/add-product-to-cart.dto';
import { UpdateProductInCartDto } from 'src/carts/dtos/update-product-in-cart.dto';
import { CartsService } from 'src/carts/servoces/carts/carts.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('api/carts')
export class CartsController {
  constructor(private cartServices: CartsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  addProductToCart(
    @Body() addProductToCartDto: AddProductToCartDto,
    @Req() req: Request,
  ) {
    const owner = req.user['sub'];
    return this.cartServices.addProductToCart(owner, addProductToCartDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  @UsePipes(new ValidationPipe())
  getCurrentCart(@Req() req: Request) {
    const owner = req.user['sub'];
    return this.cartServices.getCurrentCartByOwner(owner);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateProductInCart(
    @Param('id') id: string,
    @Body() updateProductInCartDto: UpdateProductInCartDto,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.cartServices.updateProductInCart(id, updateProductInCartDto);
  }
}
