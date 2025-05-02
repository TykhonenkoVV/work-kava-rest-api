import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class CoffeeClassic {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  price: number[];

  @Prop({ required: true })
  coffee: number;

  @Prop({ required: true })
  water: number;

  @Prop({ required: true })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export const CoffeeClassicSchema = SchemaFactory.createForClass(CoffeeClassic);
