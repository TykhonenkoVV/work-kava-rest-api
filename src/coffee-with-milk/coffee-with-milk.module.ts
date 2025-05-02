import { Module } from '@nestjs/common';
import { CoffeeWithMilkController } from './controllers/coffee-with-milk/coffee-with-milk.controller';
import { CoffeeWithMilkService } from './services/coffee-with-milk/coffee-with-milk.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CoffeeWithMilk,
  CoffeeWithMilkSchema,
} from './schemas/coffee-with-milk.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CoffeeWithMilk.name,
        schema: CoffeeWithMilkSchema,
      },
    ]),
  ],
  controllers: [CoffeeWithMilkController],
  providers: [CoffeeWithMilkService],
})
export class CoffeeWithMilkModule {}
