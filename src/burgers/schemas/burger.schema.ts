import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { LocatedFastfood } from 'src/common/schemas/located-fastfood.schema';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class Burger {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  archived: boolean;

  @Prop({ _id: false, type: LocatedFastfood })
  en: LocatedFastfood;

  @Prop({ _id: false, type: LocatedFastfood })
  de: LocatedFastfood;

  @Prop({ _id: false, type: LocatedFastfood })
  ua: LocatedFastfood;

  @Prop()
  imgURL: string;

  @Prop()
  webpImgURL: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export const BurgerSchema = SchemaFactory.createForClass(Burger);
