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
    coffeeWithMilkData: CreateCoffeeWithMilkDto,
  ) {
    const isMatch = await this.coffeeWithMilkModel.findOne({
      title: coffeeWithMilkData.title,
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newCoffeeWithMilk = await new this.coffeeWithMilkModel({
      owner,
      ...coffeeWithMilkData,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      board: {
        _id: newCoffeeWithMilk._id,
        index: newCoffeeWithMilk.index,
        price: newCoffeeWithMilk.price,
        title: newCoffeeWithMilk.title,
        coffee: newCoffeeWithMilk.coffee,
        water: newCoffeeWithMilk.water,
        milk: newCoffeeWithMilk.milk,
        image: newCoffeeWithMilk.image,
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

  async updateCoffeeWithMilk(
    id: string,
    owner: string,
    updateCoffeeWithMilkDto: UpdateCoffeeWithMilkDto,
  ) {
    const result = await this.coffeeWithMilkModel.find({
      owner,
      title: updateCoffeeWithMilkDto.title,
    });
    const isDuplicateTitle = result.filter(
      (el) => el._id.toString() !== id,
    ).length;
    if (isDuplicateTitle) {
      throw new HttpException('This product name already exists', 409);
    }

    const coffeeWithMilk = await this.coffeeWithMilkModel
      .findByIdAndUpdate(id, updateCoffeeWithMilkDto, {
        new: true,
        select: '-owner -createdAt -updatedAt',
      })
      .exec();

    return {
      status: 'create',
      code: 201,
      message: 'Product updated successfully',
      coffee_with_milk: coffeeWithMilk,
    };
  }

  async deleteCoffeeWithMilk(id: string) {
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
