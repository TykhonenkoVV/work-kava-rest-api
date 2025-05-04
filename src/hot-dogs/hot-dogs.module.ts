import { Module } from '@nestjs/common';
import { HotDogsController } from './controllers/hot-dogs/hot-dogs.controller';
import { HotDogsService } from './services/hot-dogs/hot-dogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotDog, HotDogSchema } from './schemas/hot-dog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HotDog.name,
        schema: HotDogSchema,
      },
    ]),
  ],
  controllers: [HotDogsController],
  providers: [HotDogsService],
})
export class HotDogsModule {}
