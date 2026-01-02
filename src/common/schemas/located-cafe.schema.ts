import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: false })
export class LocatedCafe {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  standart: number;
}

export const LocatedCafeSchema = SchemaFactory.createForClass(LocatedCafe);
