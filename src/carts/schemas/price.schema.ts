import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Enum } from './enum.schema';

@Schema({ versionKey: false, timestamps: false })
export class Price {
  @Prop({ _id: false, type: Enum })
  standart: Enum;

  @Prop({ _id: false, type: Enum })
  xl: Enum;
}
