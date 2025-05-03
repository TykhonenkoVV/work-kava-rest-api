import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHotDogsDto } from 'src/hot-dogs/dtos/create-hot-dogs.dto';
import { UpdateHotDogsDto } from 'src/hot-dogs/dtos/update-hot-dogs.dto';
import { HotDogs } from 'src/hot-dogs/schemas/hot-dogs.schema';

@Injectable()
export class HotDogsService {
  constructor(@InjectModel(HotDogs.name) private hoDogsModel: Model<HotDogs>) {}

  async createHotDogs(owner: string, hotDogsData: CreateHotDogsDto) {
    const isMatch = await this.hoDogsModel.findOne({
      title: hotDogsData.title,
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newHotDogs = await new this.hoDogsModel({
      owner,
      ...hotDogsData,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      hot_dogs: {
        _id: newHotDogs._id,
        index: newHotDogs.index,
        price_standart: newHotDogs.price_standart,
        price_double: newHotDogs.price_double,
        title: newHotDogs.title,
        image: newHotDogs.image,
      },
    };
  }

  async getHotDogs() {
    const hotDogsArr = await this.hoDogsModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      hot_dogs: hotDogsArr,
    };
  }

  async updateHotDogs(
    id: string,
    owner: string,
    updateHotDogsDto: UpdateHotDogsDto,
  ) {
    const result = await this.hoDogsModel.find({
      owner,
      title: updateHotDogsDto.title,
    });
    const isDuplicateTitle = result.filter(
      (el) => el._id.toString() !== id,
    ).length;
    if (isDuplicateTitle) {
      throw new HttpException('This product name already exists', 409);
    }

    const hotDogs = await this.hoDogsModel
      .findByIdAndUpdate(id, updateHotDogsDto, {
        new: true,
        select: '-owner -createdAt -updatedAt',
      })
      .exec();

    return {
      status: 'create',
      code: 201,
      message: 'Product updated successfully',
      hot_dogs: hotDogs,
    };
  }

  async deleteHotdogs(id: string) {
    const deletedHotDogs = await this.hoDogsModel.findByIdAndDelete({
      _id: id,
    });
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedHotDogs,
    };
  }
}
