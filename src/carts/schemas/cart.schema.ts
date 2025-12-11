import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class Cart {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: false })
  standart?: number;

  @Prop({ required: false })
  xl?: number;

  @Prop({ required: true })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner', index: false })
  owner: User;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
