import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBurgersDto } from 'src/burgers/dtos/create-burgers.dto';
import { UpdateBurgersDto } from 'src/burgers/dtos/update-burgers.dto';
import { Burgers } from 'src/burgers/schemas/burgers.schema';

@Injectable()
export class BurgersService {
  constructor(
    @InjectModel(Burgers.name) private burgersModel: Model<Burgers>,
  ) {}

  async createBurgers(owner: string, burgersData: CreateBurgersDto) {
    const isMatch = await this.burgersModel.findOne({
      title: burgersData.title,
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newBurgers = await new this.burgersModel({
      owner,
      ...burgersData,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      burger: {
        _id: newBurgers._id,
        index: newBurgers.index,
        price_standart: newBurgers.price_standart,
        price_double: newBurgers.price_double,
        title: newBurgers.title,
        image: newBurgers.image,
      },
    };
  }

  async getBurgers() {
    const burgersArr = await this.burgersModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      burgers: burgersArr,
    };
  }

  async updateBurgers(
    id: string,
    owner: string,
    updateBurgersDto: UpdateBurgersDto,
  ) {
    const result = await this.burgersModel.find({
      owner,
      title: updateBurgersDto.title,
    });
    const isDuplicateTitle = result.filter(
      (el) => el._id.toString() !== id,
    ).length;
    if (isDuplicateTitle) {
      throw new HttpException('This product name already exists', 409);
    }

    const burgers = await this.burgersModel
      .findByIdAndUpdate(id, updateBurgersDto, {
        new: true,
        select: '-owner -createdAt -updatedAt',
      })
      .exec();

    return {
      status: 'create',
      code: 201,
      message: 'Product updated successfully',
      burger: burgers,
    };
  }

  async deleteBurger(id: string) {
    const deletedBurgers = await this.burgersModel.findByIdAndDelete({
      _id: id,
    });
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedBurgers,
    };
  }
}
