import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Double } from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class Burger {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  archived: boolean;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  en: { title: string; standart: number; xl: number; ingredients: string };

  @Prop({ type: mongoose.Schema.Types.Mixed })
  de: { title: string; standart: number; xl: number; ingredients: string };

  @Prop({ type: mongoose.Schema.Types.Mixed })
  ua: { title: string; standart: number; xl: number; ingredients: string };

  // @Prop({ required: true })
  // title_en: string;

  // @Prop({ required: true })
  // title_de: string;

  // @Prop({ required: true })
  // title_ua: string;

  // @Prop({ required: true })
  // price_standart_en: number;

  // @Prop({ required: true })
  // price_double_en: number;

  // @Prop({ required: true })
  // price_standart_de: number;

  // @Prop({ required: true })
  // price_double_de: number;

  // @Prop({ required: true })
  // price_standart_ua: number;

  // @Prop({ required: true })
  // price_double_ua: number;

  // @Prop({ required: true })
  // ingredients_en: string;

  // @Prop({ required: true })
  // ingredients_de: string;

  // @Prop({ required: true })
  // ingredients_ua: string;

  @Prop()
  imgURL: string;

  @Prop()
  webpImgURL: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export const BurgerSchema = SchemaFactory.createForClass(Burger);
