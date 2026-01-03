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
      en: { title: createRollDto.en.title },
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
      roll: newRoll,
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
    const rollsArr = await this.rollModel.find({ archived: false }, null, {
      select: '-owner -createdAt -updatedAt',
    });
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      rolls: rollsArr,
    };
  }

  async getRollById(id: string) {
    const result = await this.rollModel
      .findById(id, null, { select: '-owner -createdAt -updatedAt' })
      .exec();
    if (result === null) return false;
    else return result;
  }

  async updateRoll(id: string, updateRollDto: UpdateRollDto) {
    const isFinded = await this.getRollById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const updatedRoll = await this.rollModel
      .findByIdAndUpdate(
        id,
        {
          index: updateRollDto.index,
          archived: updateRollDto.archived,
          imgURL: updateRollDto.imgURL,
          webpImgURL: updateRollDto.webpImgURL,
          $set: {
            'en.title': updateRollDto?.en?.title,
            'en.standart': updateRollDto?.en?.standart,
            'en.xl': updateRollDto?.en?.xl,
            'en.ingredients': updateRollDto?.en?.ingredients,
            'de.title': updateRollDto?.de?.title,
            'de.standart': updateRollDto?.de?.standart,
            'de.xl': updateRollDto?.de?.xl,
            'de.ingredients': updateRollDto?.de?.ingredients,
            'ua.title': updateRollDto?.ua?.title,
            'ua.standart': updateRollDto?.ua?.standart,
            'ua.xl': updateRollDto?.ua?.xl,
            'ua.ingredients': updateRollDto?.ua?.ingredients,
          },
        },
        {
          new: true,
          select: '-owner -createdAt -updatedAt',
        },
      )
      .exec();

    return {
      status: 'update',
      code: 201,
      message: 'Product updated successfully',
      updated: updatedRoll,
    };
  }

  async deleteRoll(id: string) {
    const isFinded = await this.getRollById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const deletedRoll = await this.rollModel.findByIdAndDelete({ _id: id });
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/rolls/png/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/rolls/webp/${id}`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedRoll,
    };
  }
}
