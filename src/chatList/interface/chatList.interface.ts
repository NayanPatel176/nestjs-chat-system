import { Document } from 'mongoose';
export interface IChatList extends Document {
  readonly isGroupChat: boolean;
  readonly groupName: string;
  readonly participants: string[];
  readonly userList: { userId: string; userName: string }[];
  readonly createdAt: Date;
  readonly lastMessAt: Date;
  readonly senderName?: string;
  readonly senderId?: string;
}
