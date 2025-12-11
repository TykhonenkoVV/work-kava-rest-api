import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddProductToCartDto } from 'src/carts/dtos/add-product-to-cart.dto';
import { UpdateProductInCartDto } from 'src/carts/dtos/update-product-in-cart.dto';
import { Cart } from 'src/carts/schemas/cart.schema';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async addProductToCart(owner: string, addProductDto: AddProductToCartDto) {
    const newCart = await new this.cartModel({
      owner,
      ...addProductDto,
    }).save();
    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      product: {
        productId: newCart.productId,
        standart: newCart.standart,
        xl: newCart.xl,
        category: newCart.category,
      },
    };
  }

  async getCurrentCartByOwner(id: string) {
    const currentCart = await this.cartModel.find({ owner: id }, null, {
      select: '-owner -createdAt -updatedAt',
    });
    return {
      status: 'success',
      code: 200,
      message: 'Products in cart successfully received',
      cart: currentCart,
    };
  }

  async getProductById(id: string) {
    const result = await this.cartModel.findById(id).exec();
    if (result === null) return false;
    else return result;
  }

  async updateProductInCart(
    id: string,
    updateProductInCartDto: UpdateProductInCartDto,
  ) {
    const isFinded = await this.getProductById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const updatedProduct = await this.cartModel
      .findByIdAndUpdate(id, updateProductInCartDto, {
        new: true,
        select: '-owner -createdAt -updatedAt',
      })
      .exec();

    return {
      status: 'create',
      code: 201,
      message: 'Product updated successfully',
      updated: updatedProduct,
    };
  }
}
