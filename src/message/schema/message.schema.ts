import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ type: 'ObjectId', ref: 'ChatList', required: true })
  chatId: Types.ObjectId;

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  senderId: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  senderName: string;

  @Prop({ required: true })
  isGroupChat: boolean;

  @Prop()
  groupName?: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
