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
      en: { title: createDessertDto.en.title },
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
      dessert: newDesserts,
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
    console.log('GET Id', id);

    const result = await this.dessertModel.findById(id).exec();
    if (result === null) return false;
    else return result;
  }

  async updateDessert(id: string, updateDessertDto: UpdateDessertDto) {
    const isFinded = await this.getDessertById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const updatedDessert = await this.dessertModel
      .findByIdAndUpdate(
        id,
        {
          index: updateDessertDto.index,
          archived: updateDessertDto.archived,
          weight: updateDessertDto.weight,
          imgURL: updateDessertDto.imgURL,
          webpImgURL: updateDessertDto.webpImgURL,
          $set: {
            'en.title': updateDessertDto?.en?.title,
            'en.standart': updateDessertDto?.en?.standart,
            'de.title': updateDessertDto?.de?.title,
            'de.standart': updateDessertDto?.de?.standart,
            'ua.title': updateDessertDto?.ua?.title,
            'ua.standart': updateDessertDto?.ua?.standart,
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
      updated: updatedDessert,
    };
  }

  async deleteDessert(id: string) {
    const isFinded = await this.getDessertById(id);

    if (!isFinded) throw new HttpException('Product not found.', 404);
    const deletedDessert = await this.dessertModel.findByIdAndDelete(id);
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/desserts/jpeg/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/cafe/desserts/webp/${id}`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedDessert,
    };
  }
}
