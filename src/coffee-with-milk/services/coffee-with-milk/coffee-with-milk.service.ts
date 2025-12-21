import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { CreateCoffeeWithMilkDto } from 'src/coffee-with-milk/dtos/create-coffe-with-milk.dto';
import { UpdateCoffeeWithMilkDto } from 'src/coffee-with-milk/dtos/update-coffe-with-milk.dto';
import { CoffeeWithMilk } from 'src/coffee-with-milk/schemas/coffee-with-milk.schema';

@Injectable()
export class CoffeeWithMilkService {
  constructor(
    @InjectModel(CoffeeWithMilk.name)
    private coffeeWithMilkModel: Model<CoffeeWithMilk>,
    private cloudinaryServices: CloudinaryService,
  ) {}

  async createCoffeeWithMilk(
    owner: string,
    createCoffeeWithMilkDto: CreateCoffeeWithMilkDto,
  ) {
    const isMatch = await this.coffeeWithMilkModel.findOne({
      en: { title: createCoffeeWithMilkDto.en.title },
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
      coffee_with_milk: newCoffeeWithMilk,
    };
  }

  async getAllCoffeeWithMilk() {
    const coffeeWithMilkArr = await this.coffeeWithMilkModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      coffee_with_milk: coffeeWithMilkArr,
    };
  }

  async getCoffeeWithMilk() {
    const coffeeWithMilkArr = await this.coffeeWithMilkModel.find(
      {
        archived: false,
      },
      { select: '-createdAt -updatedAt' },
    );
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
      .findByIdAndUpdate(
        id,
        {
          index: updateCoffeeWithMilkDto.index,
          archived: updateCoffeeWithMilkDto.archived,
          coffee: updateCoffeeWithMilkDto.coffee,
          water: updateCoffeeWithMilkDto.water,
          milk: updateCoffeeWithMilkDto.milk,
          imgURL: updateCoffeeWithMilkDto.imgURL,
          webpImgURL: updateCoffeeWithMilkDto.webpImgURL,
          $set: {
            'en.title': updateCoffeeWithMilkDto?.en?.title,
            'en.standart': updateCoffeeWithMilkDto?.en?.standart,
            'de.title': updateCoffeeWithMilkDto?.de?.title,
            'de.standart': updateCoffeeWithMilkDto?.de?.standart,
            'ua.title': updateCoffeeWithMilkDto?.ua?.title,
            'ua.standart': updateCoffeeWithMilkDto?.ua?.standart,
          },
        },
        {
          new: true,
          select: '-owner -createdAt -updatedAt',
        },
      )
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
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/coffee-with-milk/png/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/coffee-with-milk/webp/${id}`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedCaffeeWithMilk,
    };
  }
}
