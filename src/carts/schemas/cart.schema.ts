import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';
import { Price } from './price.schema';

@Schema({ versionKey: false, timestamps: true })
export class Cart {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  archived: boolean;

  @Prop({ required: false })
  standart?: number;

  @Prop({ required: false })
  xl?: number;

  @Prop({ _id: false, type: Price })
  price: Price;

  @Prop({ required: true })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner', index: false })
  owner: User;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
