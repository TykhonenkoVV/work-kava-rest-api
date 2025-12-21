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
      en: { title: createBurgerDto.en.title },
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
      burger: newBurger,
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
      .findByIdAndUpdate(
        id,
        {
          index: updateBurgerDto.index,
          archived: updateBurgerDto.archived,
          imgURL: updateBurgerDto.imgURL,
          webpImgURL: updateBurgerDto.webpImgURL,
          $set: {
            'en.title': updateBurgerDto?.en?.title,
            'en.standart': updateBurgerDto?.en?.standart,
            'en.xl': updateBurgerDto?.en?.xl,
            'en.ingredients': updateBurgerDto?.en?.ingredients,
            'de.title': updateBurgerDto?.de?.title,
            'de.standart': updateBurgerDto?.de?.standart,
            'de.xl': updateBurgerDto?.de?.xl,
            'de.ingredients': updateBurgerDto?.de?.ingredients,
            'ua.title': updateBurgerDto?.ua?.title,
            'ua.standart': updateBurgerDto?.ua?.standart,
            'ua.xl': updateBurgerDto?.ua?.xl,
            'ua.ingredients': updateBurgerDto?.ua?.ingredients,
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
      `workkava/fastfood/burgers/png/${id}`,
    );
    await this.cloudinaryServices.destroyImage(
      `workkava/fastfood/burgers/webp/${id}`,
    );
    return {
      status: 'success',
      code: 200,
      message: 'Product deleted',
      deleted: deletedBurger,
    };
  }
}
