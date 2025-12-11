import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/users/User.schema';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cloudinaryServices: CloudinaryService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async getCurrent(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async getCurrentAdmin(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async getUsers() {
    return this.userModel.find();
  }

  async getUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const user = await this.getUserById(userId);
      if (!user) throw new HttpException('User not found', 404);

      const isMatch = await bcrypt.compare(
        updateUserDto.password,
        user.password,
      );

      if (!isMatch) {
        throw new BadRequestException('Password or email is incorrect');
      }
    }

    if (updateUserDto.newPassword) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(updateUserDto.newPassword, salt);
      updateUserDto.password = hashPassword;
    }
    const result = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, {
        new: true,
      })
      .exec();

    return {
      name: result.name,
      email: result.email,
      theme: result.theme,
      locale: result.locale,
      avatarURL: result.avatarURL,
    };
  }

  async deleteUser(id: string): Promise<UserDocument> {
    await this.cloudinaryServices.destroyAvatar(`tasks/avatars/${id}`);
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
