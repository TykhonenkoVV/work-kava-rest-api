import { Module } from '@nestjs/common';
import { CoffeeWithMilkController } from './controllers/coffee-with-milk/coffee-with-milk.controller';
import { CoffeeWithMilkService } from './services/coffee-with-milk/coffee-with-milk.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CoffeeWithMilk,
  CoffeeWithMilkSchema,
} from './schemas/coffee-with-milk.schema';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CoffeeWithMilk.name,
        schema: CoffeeWithMilkSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [CoffeeWithMilkController],
  providers: [CoffeeWithMilkService, CloudinaryService],
})
export class CoffeeWithMilkModule {}
