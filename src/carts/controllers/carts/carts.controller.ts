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
import { AddProductToCartDto } from 'src/carts/dtos/add-product-to-cart.dto';
import { UpdateProductInCartDto } from 'src/carts/dtos/update-product-in-cart.dto';
import { CartsService } from 'src/carts/services/carts/carts.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('api/cart')
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
  getCurrentCartByOwner(@Req() req: Request) {
    const owner = req.user['sub'];
    return this.cartServices.getCurrentCartByOwner(owner);
  }

  @UseGuards(AccessTokenGuard)
  @Get('history')
  getHistoryByOwner(@Req() req: Request) {
    const owner = req.user['sub'];
    return this.cartServices.getHistoryByOwner(owner);
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

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteProductInCart(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid id.', 404);
    return this.cartServices.deleteProductInCart(id);
  }
}
