import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: false })
export class LocatedCart {
  @Prop({ required: true })
  title: string;

  @Prop()
  standart?: number;

  @Prop()
  xl?: number;
}

export const LocatedCartSchema = SchemaFactory.createForClass(LocatedCart);
