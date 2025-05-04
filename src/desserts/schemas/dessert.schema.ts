import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class Dessert {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  price: number[];

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export const DessertSchema = SchemaFactory.createForClass(Dessert);
