import { Module } from '@nestjs/common';
import { HotDogsController } from './controllers/hot-dogs/hot-dogs.controller';
import { HotDogsService } from './services/hot-dogs/hot-dogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotDog, HotDogSchema } from './schemas/hot-dog.schema';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HotDog.name,
        schema: HotDogSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [HotDogsController],
  providers: [HotDogsService, CloudinaryService],
})
export class HotDogsModule {}
