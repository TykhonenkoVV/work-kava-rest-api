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
      en: { title: createHotDogDto.en.title },
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
      hot_dog: newHotDog,
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
      .findByIdAndUpdate(
        id,
        {
          index: updateHotDogDto.index,
          archived: updateHotDogDto.archived,
          imgURL: updateHotDogDto.imgURL,
          webpImgURL: updateHotDogDto.webpImgURL,
          $set: {
            'en.title': updateHotDogDto?.en?.title,
            'en.standart': updateHotDogDto?.en?.standart,
            'en.xl': updateHotDogDto?.en?.xl,
            'en.ingredients': updateHotDogDto?.en?.ingredients,
            'de.title': updateHotDogDto?.de?.title,
            'de.standart': updateHotDogDto?.de?.standart,
            'de.xl': updateHotDogDto?.de?.xl,
            'de.ingredients': updateHotDogDto?.de?.ingredients,
            'ua.title': updateHotDogDto?.ua?.title,
            'ua.standart': updateHotDogDto?.ua?.standart,
            'ua.xl': updateHotDogDto?.ua?.xl,
            'ua.ingredients': updateHotDogDto?.ua?.ingredients,
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
      `workkava/fastfood/hot-dogs/png/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/hot-dogs/webp/${id}`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedHotDog,
    };
  }
}
