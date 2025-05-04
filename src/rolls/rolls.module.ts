import { Module } from '@nestjs/common';
import { RollsController } from './controllers/rolls/rolls.controller';
import { RollsService } from './services/rolls/rolls.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Roll, RollSchema } from './schemas/roll.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Roll.name,
        schema: RollSchema,
      },
    ]),
  ],
  controllers: [RollsController],
  providers: [RollsService],
})
export class RollsModule {}
