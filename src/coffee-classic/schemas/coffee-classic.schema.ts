import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { LocatedCafe } from 'src/common/schemas/located-cafe.schema';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class CoffeeClassic {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  archived: boolean;

  @Prop({ _id: false, type: LocatedCafe })
  en: LocatedCafe;

  @Prop({ _id: false, type: LocatedCafe })
  de: LocatedCafe;

  @Prop({ _id: false, type: LocatedCafe })
  ua: LocatedCafe;

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
