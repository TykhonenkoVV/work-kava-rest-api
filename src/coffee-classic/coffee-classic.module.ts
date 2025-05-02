import { Module } from '@nestjs/common';
import { CoffeeClassicController } from './controllers/coffee-classic/coffee-classic.controller';
import { CoffeeClassicService } from './services/coffee-classic/coffee-classic.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CoffeeClassic,
  CoffeeClassicSchema,
} from './schemas/coffee-classic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CoffeeClassic.name,
        schema: CoffeeClassicSchema,
      },
    ]),
  ],
  controllers: [CoffeeClassicController],
  providers: [CoffeeClassicService],
})
export class CoffeeClassicModule {}
