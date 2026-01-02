import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: false })
export class LocatedFastfood {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  standart: number;

  @Prop({ required: true })
  xl: number;

  @Prop({ required: true })
  ingredients: string;
}

export const LocatedFastfoodSchema =
  SchemaFactory.createForClass(LocatedFastfood);
