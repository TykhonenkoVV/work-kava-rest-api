import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRollDto } from 'src/rolls/dtos/create-roll.dto';
import { UpdateRollDto } from 'src/rolls/dtos/update-roll.dto';
import { Roll } from 'src/rolls/schemas/roll.schema';

@Injectable()
export class RollsService {
  constructor(@InjectModel(Roll.name) private rollModel: Model<Roll>) {}

  async createRoll(owner: string, createRollDto: CreateRollDto) {
    const isMatch = await this.rollModel.findOne({
      title: createRollDto.title,
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newRoll = await new this.rollModel({
      owner,
      ...createRollDto,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      roll: {
        _id: newRoll._id,
        index: newRoll.index,
        price_standart: newRoll.price_standart,
        price_xl: newRoll.price_xl,
        title: newRoll.title,
        image: newRoll.image,
      },
    };
  }

  async getRolls() {
    const rollsArr = await this.rollModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      rolls: rollsArr,
    };
  }

  async getRollById(id: string) {
    const result = await this.rollModel.findById(id).exec();
    if (result === null) return false;
    else return result;
  }

  async updateRoll(id: string, updateRollDto: UpdateRollDto) {
    const isFinded = await this.getRollById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const updatedRoll = await this.rollModel
      .findByIdAndUpdate(id, updateRollDto, {
        new: true,
        select: '-owner -createdAt -updatedAt',
      })
      .exec();

    return {
      status: 'create',
      code: 201,
      message: 'Product updated successfully',
      updated: updatedRoll,
    };
  }

  async deleteRoll(id: string) {
    const isFinded = await this.getRollById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const deletedRoll = await this.rollModel.findByIdAndDelete({ _id: id });
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedRoll,
    };
  }
}
