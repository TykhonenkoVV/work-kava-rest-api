import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoffeeWithMilkDto } from 'src/coffee-with-milk/dtos/create-coffe-with-milk.dto';
import { UpdateCoffeeWithMilkDto } from 'src/coffee-with-milk/dtos/update-coffe-with-milk.dto';
import { CoffeeWithMilk } from 'src/coffee-with-milk/schemas/coffee-with-milk.schema';

@Injectable()
export class CoffeeWithMilkService {
  constructor(
    @InjectModel(CoffeeWithMilk.name)
    private coffeeWithMilkModel: Model<CoffeeWithMilk>,
  ) {}

  async createCoffeeWithMilk(
    owner: string,
    createCoffeeWithMilkDto: CreateCoffeeWithMilkDto,
  ) {
    const isMatch = await this.coffeeWithMilkModel.findOne({
      title_en: createCoffeeWithMilkDto.title_en,
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newCoffeeWithMilk = await new this.coffeeWithMilkModel({
      owner,
      ...createCoffeeWithMilkDto,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      coffee_with_milk: {
        _id: newCoffeeWithMilk._id,
        index: newCoffeeWithMilk.index,
        archived: newCoffeeWithMilk.archived,
        title_en: newCoffeeWithMilk.title_en,
        title_de: newCoffeeWithMilk.title_de,
        title_ua: newCoffeeWithMilk.title_ua,
        price_en: newCoffeeWithMilk.price_en,
        price_de: newCoffeeWithMilk.price_de,
        price_ua: newCoffeeWithMilk.price_ua,
        coffee: newCoffeeWithMilk.coffee,
        water: newCoffeeWithMilk.water,
        milk: newCoffeeWithMilk.milk,
      },
    };
  }
  async getCoffeeWithMilk() {
    const coffeeWithMilkArr = await this.coffeeWithMilkModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      coffee_with_milk: coffeeWithMilkArr,
    };
  }

  async getCoffeeWithMilkById(id: string) {
    const result = await this.coffeeWithMilkModel.findById(id).exec();
    if (result === null) return false;
    else return result;
  }

  async updateCoffeeWithMilk(
    id: string,
    updateCoffeeWithMilkDto: UpdateCoffeeWithMilkDto,
  ) {
    const isFinded = await this.getCoffeeWithMilkById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const updatedCoffeeWithMilk = await this.coffeeWithMilkModel
      .findByIdAndUpdate(id, updateCoffeeWithMilkDto, {
        new: true,
        select: '-owner -createdAt -updatedAt',
      })
      .exec();

    return {
      status: 'create',
      code: 201,
      message: 'Product updated successfully',
      updated: updatedCoffeeWithMilk,
    };
  }

  async deleteCoffeeWithMilk(id: string) {
    const isFinded = await this.getCoffeeWithMilkById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const deletedCaffeeWithMilk =
      await this.coffeeWithMilkModel.findByIdAndDelete({
        _id: id,
      });
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedCaffeeWithMilk,
    };
  }
}
