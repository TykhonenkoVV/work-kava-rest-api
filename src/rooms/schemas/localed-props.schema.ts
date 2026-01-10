import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: false })
export class LocaledProps {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;
}

export const LocaledPropsSchema = SchemaFactory.createForClass(LocaledProps);
