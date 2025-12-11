import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ versionKey: false, timestamps: true })
export class Admin {
  @Prop({ required: true })
  password: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  theme: string;

  @Prop()
  locale: string;

  @Prop()
  avatarURL: string;

  @Prop()
  avatarURLsmall: string;

  @Prop()
  refreshToken: string;

  @Prop({ enum: ['ADMIN', 'EMPLOYEE', 'USER'] })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
