import { Module } from '@nestjs/common';
import { BurgersController } from './controllers/burgers/burgers.controller';
import { BurgersService } from './services/burgers/burgers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Burger, BurgerSchema } from './schemas/burger.schema';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Burger.name,
        schema: BurgerSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [BurgersController],
  providers: [BurgersService, CloudinaryService],
})
export class BurgersModule {}
