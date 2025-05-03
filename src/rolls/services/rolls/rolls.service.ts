import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRollsDto } from 'src/rolls/dtos/create-rolls.dto';
import { UpdateRollsDto } from 'src/rolls/dtos/update-rolls.dto';
import { Rolls } from 'src/rolls/schemas/rolls.schema';

@Injectable()
export class RollsService {
  constructor(@InjectModel(Rolls.name) private rollsModel: Model<Rolls>) {}

  async createRolls(owner: string, createRollsDto: CreateRollsDto) {
    const isMatch = await this.rollsModel.findOne({
      title: createRollsDto.title,
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newRolls = await new this.rollsModel({
      owner,
      ...createRollsDto,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      rolls: {
        _id: newRolls._id,
        index: newRolls.index,
        price_standart: newRolls.price_standart,
        price_xl: newRolls.price_xl,
        title: newRolls.title,
        image: newRolls.image,
      },
    };
  }

  async getRolls() {
    const rollsArr = await this.rollsModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      rolls: rollsArr,
    };
  }

  async updateRolls(id: string, updateRollsDto: UpdateRollsDto) {
    const result = await this.rollsModel.findOne({
      _id: id,
    });

    if (!result) {
      throw new HttpException('Product id not found', 409);
    } else {
      const rolls = await this.rollsModel
        .findByIdAndUpdate(id, updateRollsDto, {
          new: true,
          select: '-owner -createdAt -updatedAt',
        })
        .exec();

      return {
        status: 'create',
        code: 201,
        message: 'Product updated successfully',
        rolls: rolls,
      };
    }
  }

  async deleteRolls(id: string) {
    const result = await this.rollsModel.findOne({ _id: id });
    if (!result) {
      throw new HttpException('Product id not found', 409);
    } else {
      const deletedRoll = await this.rollsModel.findByIdAndDelete({ _id: id });
      return {
        status: 'success',
        code: 200,
        message: 'Product deleted',
        deleted: deletedRoll,
      };
    }
  }
}
