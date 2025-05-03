import { Module } from '@nestjs/common';
import { HotDogsController } from './controllers/hot-dogs/hot-dogs.controller';
import { HotDogsService } from './services/hot-dogs/hot-dogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotDogs, HotDogsSchema } from './schemas/hot-dogs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HotDogs.name,
        schema: HotDogsSchema,
      },
    ]),
  ],
  controllers: [HotDogsController],
  providers: [HotDogsService],
})
export class HotDogsModule {}
