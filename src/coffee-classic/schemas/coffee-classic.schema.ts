import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class CoffeeClassic {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  archived: boolean;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  en: { title: string; standart: number };

  @Prop({ type: mongoose.Schema.Types.Mixed })
  de: { title: string; standart: number };

  @Prop({ type: mongoose.Schema.Types.Mixed })
  ua: { title: string; standart: number };

  @Prop({ required: true })
  coffee: number;

  @Prop({ required: true })
  water: number;

  @Prop()
  imgURL: string;

  @Prop()
  webpImgURL: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export const CoffeeClassicSchema = SchemaFactory.createForClass(CoffeeClassic);
