import { Module } from '@nestjs/common';
import { BurgersController } from './controllers/burgers/burgers.controller';
import { BurgersService } from './services/burgers/burgers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Burgers, BurgersSchema } from './schemas/burgers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Burgers.name,
        schema: BurgersSchema,
      },
    ]),
  ],
  controllers: [BurgersController],
  providers: [BurgersService],
})
export class BurgersModule {}
