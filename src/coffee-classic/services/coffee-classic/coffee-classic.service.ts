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
      en: { title: createCoffeeClassicDto.en.title },
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
      coffee_classic: newCoffeeClassic,
    };
  }

  async getAllCoffeeClassic() {
    const coffeeClassicArr = await this.coffeeClassicModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      coffee_classic: coffeeClassicArr,
    };
  }

  async getCoffeeClassic() {
    const coffeeClassicArr = await this.coffeeClassicModel.find({
      archived: false,
    });
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
      .findByIdAndUpdate(
        id,
        {
          index: updateCoffeeClassicDto.index,
          archived: updateCoffeeClassicDto.archived,
          coffee: updateCoffeeClassicDto.coffee,
          water: updateCoffeeClassicDto.water,
          imgURL: updateCoffeeClassicDto.imgURL,
          webpImgURL: updateCoffeeClassicDto.webpImgURL,
          $set: {
            'en.title': updateCoffeeClassicDto?.en?.title,
            'en.standart': updateCoffeeClassicDto?.en?.standart,
            'de.title': updateCoffeeClassicDto?.de?.title,
            'de.standart': updateCoffeeClassicDto?.de?.standart,
            'ua.title': updateCoffeeClassicDto?.ua?.title,
            'ua.standart': updateCoffeeClassicDto?.ua?.standart,
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
      `workkava/cafe/coffee-classic/png/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/coffee-classic/webp/${id}`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedCaffeeClassic,
    };
  }
}
