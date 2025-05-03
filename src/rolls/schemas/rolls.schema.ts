import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class Rolls {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  price_standart: number[];

  @Prop({ required: true })
  price_xl: number[];

  @Prop({ required: true })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export const RollsSchema = SchemaFactory.createForClass(Rolls);
