import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class CoffeeWithMilk {
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
  price_en: number;

  @Prop({ required: true })
  price_de: number;

  @Prop({ required: true })
  price_ua: number;

  @Prop({ required: true })
  coffee: number;

  @Prop({ required: true })
  water: number;

  @Prop({ required: true })
  milk: number;

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

export const CoffeeWithMilkSchema =
  SchemaFactory.createForClass(CoffeeWithMilk);
