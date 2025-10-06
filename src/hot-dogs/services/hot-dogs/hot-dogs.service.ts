import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { CreateHotDogDto } from 'src/hot-dogs/dtos/create-hot-dog.dto';
import { UpdateHotDogDto } from 'src/hot-dogs/dtos/update-hot-dog.dto';
import { HotDog } from 'src/hot-dogs/schemas/hot-dog.schema';

@Injectable()
export class HotDogsService {
  constructor(
    @InjectModel(HotDog.name) private hoDogModel: Model<HotDog>,
    private cloudinaryServices: CloudinaryService,
  ) {}

  async createHotDog(owner: string, createHotDogDto: CreateHotDogDto) {
    const isMatch = await this.hoDogModel.findOne({
      title_en: createHotDogDto.title_en,
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newHotDog = await new this.hoDogModel({
      owner,
      ...createHotDogDto,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      hot_dog: {
        _id: newHotDog._id,
        index: newHotDog.index,
        archived: newHotDog.archived,
        title_en: newHotDog.title_en,
        title_de: newHotDog.title_de,
        title_ua: newHotDog.title_ua,
        price_standart_en: newHotDog.price_standart_en,
        price_double_en: newHotDog.price_double_en,
        price_standart_de: newHotDog.price_standart_de,
        price_double_de: newHotDog.price_double_de,
        price_standart_ua: newHotDog.price_standart_ua,
        price_double_ua: newHotDog.price_double_ua,
        ingredients_en: newHotDog.ingredients_en,
        ingredients_de: newHotDog.ingredients_de,
        ingredients_ua: newHotDog.ingredients_ua,
      },
    };
  }

  async getAllHotDogs() {
    const hotDogsArr = await this.hoDogModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      hot_dogs: hotDogsArr,
    };
  }

  async getHotDogs() {
    const hotDogsArr = await this.hoDogModel.find({ archived: false });
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      hot_dogs: hotDogsArr,
    };
  }

  async getHotDogById(id: string) {
    const result = await this.hoDogModel.findById(id).exec();
    if (result === null) return false;
    else return result;
  }

  async updateHotDog(id: string, updateHotDogDto: UpdateHotDogDto) {
    const isFinded = await this.getHotDogById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const updatedHotDog = await this.hoDogModel
      .findByIdAndUpdate(id, updateHotDogDto, {
        new: true,
        select: '-owner -createdAt -updatedAt',
      })
      .exec();

    return {
      status: 'create',
      code: 201,
      message: 'Product updated successfully',
      updated: updatedHotDog,
    };
  }

  async deleteHotdog(id: string) {
    const isFinded = await this.getHotDogById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const deletedHotDog = await this.hoDogModel.findByIdAndDelete({
      _id: id,
    });
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/hot-dogs/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/hot-dogs/${id}_2x`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/hot-dogs-webp/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/hot-dogs-webp/${id}_2x`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedHotDog,
    };
  }
}
