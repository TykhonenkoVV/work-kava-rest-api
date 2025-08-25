import { Module } from '@nestjs/common';
import { RollsController } from './controllers/rolls/rolls.controller';
import { RollsService } from './services/rolls/rolls.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Roll, RollSchema } from './schemas/roll.schema';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Roll.name,
        schema: RollSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [RollsController],
  providers: [RollsService, CloudinaryService],
})
export class RollsModule {}
