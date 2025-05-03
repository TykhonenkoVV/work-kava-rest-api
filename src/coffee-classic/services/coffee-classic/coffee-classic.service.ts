import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoffeeClassicDto } from 'src/coffee-classic/dtos/create-coffee-classic.dto';
import { UpdateCoffeeClassicDto } from 'src/coffee-classic/dtos/update-coffee-classic.dto';
import { CoffeeClassic } from 'src/coffee-classic/schemas/coffee-classic.schema';

@Injectable()
export class CoffeeClassicService {
  constructor(
    @InjectModel(CoffeeClassic.name)
    private coffeeClassicModel: Model<CoffeeClassic>,
  ) {}

  async createCoffeeClassic(
    owner: string,
    coffeeClassicData: CreateCoffeeClassicDto,
  ) {
    const isMatch = await this.coffeeClassicModel.findOne({
      title: coffeeClassicData.title,
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newCoffeeClassic = await new this.coffeeClassicModel({
      owner,
      ...coffeeClassicData,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      coffee_classic: {
        _id: newCoffeeClassic._id,
        index: newCoffeeClassic.index,
        price: newCoffeeClassic.price,
        title: newCoffeeClassic.title,
        coffee: newCoffeeClassic.coffee,
        water: newCoffeeClassic.water,
        image: newCoffeeClassic.image,
      },
    };
  }

  async getCoffeeClassic() {
    const coffeeClassicArr = await this.coffeeClassicModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      coffee_classic: coffeeClassicArr,
    };
  }

  async updateCoffeeClassic(
    id: string,
    updateCoffeeClassicDto: UpdateCoffeeClassicDto,
  ) {
    const result = await this.coffeeClassicModel.findOne({
      _id: id,
    });
    if (!result) {
      throw new HttpException('Product id not found', 409);
    } else {
      const coffeeClassic = await this.coffeeClassicModel
        .findByIdAndUpdate(id, updateCoffeeClassicDto, {
          new: true,
          select: '-owner -createdAt -updatedAt',
        })
        .exec();

      return {
        status: 'create',
        code: 201,
        message: 'Product updated successfully',
        coffee_classic: coffeeClassic,
      };
    }
  }

  async deleteCoffeeClassic(id: string) {
    const result = await this.coffeeClassicModel.findOne({ _id: id });
    if (!result) {
      throw new HttpException('Product id not found', 409);
    } else {
      const deletedCaffeeClassic =
        await this.coffeeClassicModel.findByIdAndDelete({
          _id: id,
        });
      return {
        status: 'success',
        code: 200,
        message: 'Product deleted',
        deleted: deletedCaffeeClassic,
      };
    }
  }
}
