import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBurgerDto } from 'src/burgers/dtos/create-burger.dto';
import { UpdateBurgerDto } from 'src/burgers/dtos/update-burger.dto';
import { Burger } from 'src/burgers/schemas/burger.schema';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';

@Injectable()
export class BurgersService {
  constructor(
    @InjectModel(Burger.name) private burgerModel: Model<Burger>,
    private cloudinaryServices: CloudinaryService,
  ) {}

  async createBurger(owner: string, createBurgerDto: CreateBurgerDto) {
    const isMatch = await this.burgerModel.findOne({
      title_en: createBurgerDto.title_en,
    });
    if (isMatch) {
      throw new HttpException('This product name already exists.', 409);
    }
    const newBurger = await new this.burgerModel({
      owner,
      ...createBurgerDto,
    }).save();

    return {
      status: 'created',
      code: 201,
      message: 'Product created successfully',
      burger: {
        _id: newBurger._id,
        index: newBurger.index,
        archived: newBurger.archived,
        en: {
          title: newBurger.en.title,
          standart: newBurger.en.standart,
          xl: newBurger.en.xl,
          ingredients: newBurger.en.ingredients,
        },
        de: {
          title: newBurger.de.title,
          standart: newBurger.de.standart,
          xl: newBurger.de.xl,
          ingredients: newBurger.de.ingredients,
        },
        ua: {
          title: newBurger.ua.title,
          standart: newBurger.ua.standart,
          xl: newBurger.ua.xl,
          ingredients: newBurger.ua.ingredients,
        },
      },
    };
  }

  async getAllBurgers() {
    const burgersArr = await this.burgerModel.find();
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      burgers: burgersArr,
    };
  }

  async getBurgers() {
    const burgersArr = await this.burgerModel.find({ archived: false });
    return {
      status: 'success',
      code: 200,
      message: 'Products successfully received',
      burgers: burgersArr,
    };
  }

  async getBurgerById(id: string) {
    const result = await this.burgerModel.findById(id).exec();
    if (result === null) return false;
    else return result;
  }

  async updateBurgers(id: string, updateBurgerDto: UpdateBurgerDto) {
    const isFinded = await this.getBurgerById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const updatedBurger = await this.burgerModel
      .findByIdAndUpdate(id, updateBurgerDto, {
        new: true,
        select: '-owner -createdAt -updatedAt',
      })
      .exec();

    return {
      status: 'create',
      code: 201,
      message: 'Product updated successfully',
      updated: updatedBurger,
    };
  }

  async deleteBurger(id: string) {
    const isFinded = await this.getBurgerById(id);
    if (!isFinded) throw new HttpException('Product not found.', 404);
    const deletedBurger = await this.burgerModel.findByIdAndDelete({
      _id: id,
    });
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/burgers/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/burgers/${id}_2x`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/burgers-webp/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/burgers-webp/${id}_2x`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedBurger,
    };
  }
}
