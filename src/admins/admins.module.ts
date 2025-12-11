import { Module } from '@nestjs/common';
import { AdminsController } from './controllers/admins/admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admins/Admin.schema';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { AdminsService } from './srvices/admins/admins.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [AdminsService, CloudinaryService],
  exports: [AdminsService],
  controllers: [AdminsController],
})
export class AdminModule {}
