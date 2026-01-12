import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';
import { LocatedCart } from './located-cart.schema';

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

  @Prop({ required: false })
  count?: number;

  @Prop({ required: false })
  receipt?: string;

  @Prop({ required: false })
  date?: string;

  @Prop({ _id: false, required: true, type: LocatedCart })
  en: LocatedCart;

  @Prop({ _id: false, required: true, type: LocatedCart })
  de: LocatedCart;

  @Prop({ _id: false, required: true, type: LocatedCart })
  ua: LocatedCart;

  @Prop({ required: true })
  category: string;

  @Prop()
  imgURL: string;

  @Prop()
  webpImgURL: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner', index: false })
  owner: User;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
