import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { CreateRollDto } from 'src/rolls/dtos/create-roll.dto';
import { UpdateRollDto } from 'src/rolls/dtos/update-roll.dto';
import { Roll } from 'src/rolls/schemas/roll.schema';

@Injectable()
export class RollsService {
  constructor(
    @InjectModel(Roll.name) private rollModel: Model<Roll>,
    private cloudinaryServices: CloudinaryService,
  ) {}

  async createRoll(owner: string, createRollDto: CreateRollDto) {
    const isMatch = await this.rollModel.findOne({
      title_en: createRollDto.title_en,
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
        archived: newRoll.archived,
        title_en: newRoll.title_en,
        title_de: newRoll.title_de,
        title_ua: newRoll.title_ua,
        price_standart_en: newRoll.price_standart_en,
        price_xl_en: newRoll.price_xl_en,
        price_standart_de: newRoll.price_standart_de,
        price_xl_de: newRoll.price_xl_de,
        price_standart_ua: newRoll.price_standart_ua,
        price_xl_ua: newRoll.price_xl_ua,
        ingredients_en: newRoll.ingredients_en,
        ingredients_de: newRoll.ingredients_de,
        ingredients_ua: newRoll.ingredients_ua,
      },
    };
  }

  async getAllRolls() {
    const rollsArr = await this.rollModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      rolls: rollsArr,
    };
  }

  async getRolls() {
    const rollsArr = await this.rollModel.find({ archived: false });
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
    await this.cloudinaryServices.destroyImage(`workkava/fastfood/rolls/${id}`);
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/rolls/${id}_2x`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/rolls-webp/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/rolls-webp/${id}_2x`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedRoll,
    };
  }
}
