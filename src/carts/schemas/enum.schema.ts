import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: false })
export class Enum {
  @Prop({ required: true })
  en: number;

  @Prop({ required: true })
  de: number;

  @Prop({ required: true })
  ua: number;
}
