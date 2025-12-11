import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { Admin, AdminDocument } from 'src/admins/schemas/admins/Admin.schema';
import { CreateAdminDto } from 'src/admins/dtos/CreateAdmin.dto';
import { UpdateAdminDto } from 'src/admins/dtos/UpdateAdmin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private cloudinaryServices: CloudinaryService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<AdminDocument> {
    const newAdmin = new this.adminModel(createAdminDto);
    return newAdmin.save();
  }

  async getCurrentAdmin(email: string): Promise<AdminDocument> {
    return this.adminModel.findOne({ email }).exec();
  }

  async getAdmins() {
    return this.adminModel.find();
  }

  async getAdminById(id: string): Promise<AdminDocument> {
    return this.adminModel.findById(id).exec();
  }

  async updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto) {
    if (updateAdminDto.password) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(updateAdminDto.password, salt);
      updateAdminDto.password = hashPassword;
    }
    const result = await this.adminModel
      .findByIdAndUpdate(adminId, updateAdminDto, {
        new: true,
      })
      .exec();

    return {
      name: result.name,
      email: result.email,
      theme: result.theme,
      locale: result.locale,
      avatarURL: result.avatarURL,
      avatarURLsmall: result.avatarURLsmall,
    };
  }

  async deleteAdmin(id: string): Promise<AdminDocument> {
    await this.cloudinaryServices.destroyAvatar(`tasks/avatars/${id}`);
    await this.cloudinaryServices.destroyAvatar(`tasks/avatars/${id}_small`);
    return this.adminModel.findByIdAndDelete(id).exec();
  }
}
