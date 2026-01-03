import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LocaledProps } from './localed-props.schema';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class Room {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  archived: boolean;

  @Prop()
  imgURL: string;

  @Prop()
  webpImgURL: string;

  @Prop({ _id: false, type: LocaledProps })
  en: LocaledProps;

  @Prop({ _id: false, type: LocaledProps })
  de: LocaledProps;

  @Prop({ _id: false, type: LocaledProps })
  ua: LocaledProps;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
