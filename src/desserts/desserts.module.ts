import { Module } from '@nestjs/common';
import { DessertsController } from './controllers/desserts/desserts.controller';
import { DessertsService } from './services/desserts/desserts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dessert, DessertSchema } from './schemas/dessert.schema';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Dessert.name,
        schema: DessertSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [DessertsController],
  providers: [DessertsService, CloudinaryService],
})
export class DessertsModule {}
