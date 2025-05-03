import { Module } from '@nestjs/common';
import { RollsController } from './controllers/rolls/rolls.controller';
import { RollsService } from './services/rolls/rolls.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rolls, RollsSchema } from './schemas/rolls.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rolls.name,
        schema: RollsSchema,
      },
    ]),
  ],
  controllers: [RollsController],
  providers: [RollsService],
})
export class RollsModule {}
