import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { CreateCoffeeClassicDto } from 'src/coffee-classic/dtos/create-coffee-classic.dto';
import { UpdateCoffeeClassicDto } from 'src/coffee-classic/dtos/update-coffee-classic.dto';
import { CoffeeClassic } from 'src/coffee-classic/schemas/coffee-classic.schema';

@Injectable()
export class CoffeeClassicService {
  constructor(
    @InjectModel(CoffeeClassic.name)
    private coffeeClassicModel: Model<CoffeeClassic>,
    private cloudinaryServices: CloudinaryService,
  ) {}

  async createCoffeeClassic(
    owner: string,
    createCoffeeClassicDto: CreateCoffeeClassicDto,
  ) {
    const isMatch = await this.coffeeClassicModel.findOne({
      title_en: createCoffeeClassicDto.title_en,
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newCoffeeClassic = await new this.coffeeClassicModel({
      owner,
      ...createCoffeeClassicDto,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      coffee_classic: {
        _id: newCoffeeClassic._id,
        index: newCoffeeClassic.index,
        archived: newCoffeeClassic.archived,
        price_en: newCoffeeClassic.price_en,
        price_de: newCoffeeClassic.price_de,
        price_ua: newCoffeeClassic.price_ua,
        title_en: newCoffeeClassic.title_en,
        title_de: newCoffeeClassic.title_de,
        title_ua: newCoffeeClassic.title_ua,
        coffee: newCoffeeClassic.coffee,
        water: newCoffeeClassic.water,
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

  async getCoffeeClassicById(id: string) {
    const result = await this.coffeeClassicModel.findById(id).exec();
    if (result === null) return false;
    else return result;
  }

  async updateCoffeeClassic(
    id: string,
    updateCoffeeClassicDto: UpdateCoffeeClassicDto,
  ) {
    const isFinded = await this.getCoffeeClassicById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const updatedCoffeeClassic = await this.coffeeClassicModel
      .findByIdAndUpdate(id, updateCoffeeClassicDto, {
        new: true,
        select: '-owner -createdAt -updatedAt',
      })
      .exec();

    return {
      status: 'create',
      code: 201,
      message: 'Product updated successfully',
      updated: updatedCoffeeClassic,
    };
  }

  async deleteCoffeeClassic(id: string) {
    const isFinded = await this.getCoffeeClassicById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const deletedCaffeeClassic =
      await this.coffeeClassicModel.findByIdAndDelete({
        _id: id,
      });
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/coffee-classic/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/coffee-classic/${id}_2x`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/coffee-classic-webp/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/coffee-classic-webp/${id}_2x`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedCaffeeClassic,
    };
  }
}
