import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
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

  @Prop()
  imgURL: string;

  @Prop()
  webpImgURL: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export const BurgerSchema = SchemaFactory.createForClass(Burger);
