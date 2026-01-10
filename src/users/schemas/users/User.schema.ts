import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/common/enums/role.enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
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
  refreshToken: string;

  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.user],
  })
  role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
