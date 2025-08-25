import { Module } from '@nestjs/common';
import { CoffeeClassicController } from './controllers/coffee-classic/coffee-classic.controller';
import { CoffeeClassicService } from './services/coffee-classic/coffee-classic.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CoffeeClassic,
  CoffeeClassicSchema,
} from './schemas/coffee-classic.schema';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CoffeeClassic.name,
        schema: CoffeeClassicSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [CoffeeClassicController],
  providers: [CoffeeClassicService, CloudinaryService],
})
export class CoffeeClassicModule {}
