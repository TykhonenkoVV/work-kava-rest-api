import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Enum } from './enum.schema';

@Schema({ versionKey: false, timestamps: false })
export class Price {
  @Prop({ _id: false, type: Enum })
  standart: Enum;

  @Prop({ _id: false, type: Enum })
  xl: Enum;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
