import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
