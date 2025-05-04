import { Module } from '@nestjs/common';
import { DessertsController } from './controllers/desserts/desserts.controller';
import { DessertsService } from './services/desserts/desserts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dessert, DessertSchema } from './schemas/dessert.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Dessert.name,
        schema: DessertSchema,
      },
    ]),
  ],
  controllers: [DessertsController],
  providers: [DessertsService],
})
export class DessertsModule {}
