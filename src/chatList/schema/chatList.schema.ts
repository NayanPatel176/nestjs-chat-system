import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ChatList extends Document {
  @Prop({ required: true })
  isGroupChat: boolean;

  @Prop({ default: '' })
  groupName: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'User' }] })
  participants: string[];

  @Prop({
    type: [{ userId: { type: 'ObjectId', ref: 'User' }, userName: String }],
  })
  userList: { userId: string; userName: string }[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  lastMessAt: Date;
}

export const ChatListSchema = SchemaFactory.createForClass(ChatList);
