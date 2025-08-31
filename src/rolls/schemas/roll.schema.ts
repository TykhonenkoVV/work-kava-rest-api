import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class Roll {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  archived: boolean;

  @Prop({ required: true })
  title_en: string;

  @Prop({ required: true })
  title_de: string;

  @Prop({ required: true })
  title_ua: string;

  @Prop({ required: true })
  price_standart_en: number;

  @Prop({ required: true })
  price_xl_en: number;

  @Prop({ required: true })
  price_standart_de: number;

  @Prop({ required: true })
  price_xl_de: number;

  @Prop({ required: true })
  price_standart_ua: number;

  @Prop({ required: true })
  price_xl_ua: number;

  @Prop({ required: true })
  ingredients_en: string;

  @Prop({ required: true })
  ingredients_de: string;

  @Prop({ required: true })
  ingredients_ua: string;

  @Prop()
  imgURL: string;

  @Prop()
  img2xURL: string;

  @Prop()
  webpImgURL: string;

  @Prop()
  webpImg2xURL: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export const RollSchema = SchemaFactory.createForClass(Roll);
