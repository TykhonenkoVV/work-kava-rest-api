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
    const newCart = await new this.cartModel(
      {
        owner,
        ...addProductDto,
      },
      null,
      {
        select: '-owner -createdAt -updatedAt',
      },
    ).save();
    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      product: newCart,
    };
  }

  async getCurrentCartByOwner(id: string) {
    const currentCart = await this.cartModel.find(
      { owner: id, archived: false },
      null,
      {
        select: '-owner -createdAt -updatedAt',
      },
    );
    return {
      status: 'success',
      code: 200,
      message: 'Products in cart successfully received',
      cart: currentCart,
    };
  }

  async getHistoryByOwner(id: string) {
    const history = await this.cartModel.find(
      { owner: id, archived: true },
      null,
      {
        select: '-owner -createdAt -updatedAt',
      },
    );
    return {
      status: 'success',
      code: 200,
      message: 'History successfully received',
      history: history,
    };
  }

  async getProductById(id: string) {
    const result = await this.cartModel
      .findById(id, { archived: false })
      .exec();
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
      .findByIdAndUpdate(
        id,
        {
          archived: updateProductInCartDto?.archived,
          receipt: updateProductInCartDto?.receipt,
          standart: updateProductInCartDto?.standart,
          xl: updateProductInCartDto?.xl,
          count: updateProductInCartDto?.count,
          $set: {
            'en.standart': updateProductInCartDto?.en?.standart,
            'en.xl': updateProductInCartDto?.en?.xl,
            'de.standart': updateProductInCartDto?.de?.standart,
            'de.xl': updateProductInCartDto?.de?.xl,
            'ua.standart': updateProductInCartDto?.ua?.standart,
            'ua.xl': updateProductInCartDto?.ua?.xl,
          },
        },
        {
          new: true,
          select: '-owner -createdAt -updatedAt',
        },
      )
      .exec();

    return {
      status: 'update',
      code: 201,
      message: 'Product updated successfully',
      updated: updatedProduct,
    };
  }

  async deleteProductInCart(id: string) {
    const isFinded = await this.getProductById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const deletedCart = await this.cartModel.findByIdAndDelete(id);
    return {
      status: 'deleted',
      code: 201,
      message: 'Product deleted successfully',
      deleted: deletedCart,
    };
  }
}
