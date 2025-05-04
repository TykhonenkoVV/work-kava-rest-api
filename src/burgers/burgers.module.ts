import { Module } from '@nestjs/common';
import { BurgersController } from './controllers/burgers/burgers.controller';
import { BurgersService } from './services/burgers/burgers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Burger, BurgerSchema } from './schemas/burger.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Burger.name,
        schema: BurgerSchema,
      },
    ]),
  ],
  controllers: [BurgersController],
  providers: [BurgersService],
})
export class BurgersModule {}
