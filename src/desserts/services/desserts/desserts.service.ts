import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { CreateDessertDto } from 'src/desserts/dtos/create-dessert.dto';
import { UpdateDessertDto } from 'src/desserts/dtos/update-dessert.dto';
import { Dessert } from 'src/desserts/schemas/dessert.schema';

@Injectable()
export class DessertsService {
  constructor(
    @InjectModel(Dessert.name) private dessertModel: Model<Dessert>,
    private cloudinaryServices: CloudinaryService,
  ) {}

  async createDessert(owner: string, createDessertDto: CreateDessertDto) {
    const isMatch = await this.dessertModel.findOne({
      title_en: createDessertDto.title_en,
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newDesserts = await new this.dessertModel({
      owner,
      ...createDessertDto,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      dessert: {
        _id: newDesserts._id,
        index: newDesserts.index,
        archived: newDesserts.archived,
        title_en: newDesserts.title_en,
        title_de: newDesserts.title_de,
        title_ua: newDesserts.title_ua,
        price_en: newDesserts.price_en,
        price_de: newDesserts.price_de,
        price_ua: newDesserts.price_ua,
        weight: newDesserts.weight,
      },
    };
  }

  async getAllDesserts() {
    const dessertsArr = await this.dessertModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      desserts: dessertsArr,
    };
  }

  async getDesserts() {
    const dessertsArr = await this.dessertModel.find({ archived: false });
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      desserts: dessertsArr,
    };
  }

  async getDessertById(id: string) {
    const result = await this.dessertModel.findById(id).exec();
    if (result === null) return false;
    else return result;
  }

  async updateDessert(id: string, updateDessertDto: UpdateDessertDto) {
    const isFinded = await this.getDessertById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const updatedDessert = await this.dessertModel
      .findByIdAndUpdate(id, updateDessertDto, {
        new: true,
        select: '-owner -createdAt -updatedAt',
      })
      .exec();

    return {
      status: 'create',
      code: 201,
      message: 'Product updated successfully',
      updated: updatedDessert,
    };
  }

  async deleteDessert(id: string) {
    const isFinded = await this.getDessertById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const deletedDessert = await this.dessertModel.findByIdAndDelete({
      _id: id,
    });
    await this.cloudinaryServices.destroyImage(`workkava/cafe/desserts/${id}`);
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/desserts/${id}_2x`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/desserts-webp/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/desserts-webp/${id}_2x`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedDessert,
    };
  }
}
