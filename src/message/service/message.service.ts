import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { IMessage } from 'src/message/interface/message.interface';
import { Model } from 'mongoose';
import { QueryMessageListDto } from '../dto/query-message.dto';
@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private messageModel: Model<IMessage>) {}
  async createMessage(createMessageDto: CreateMessageDto): Promise<IMessage> {
    const newMessage = await new this.messageModel(createMessageDto);
    return newMessage.save();
  }
  async getAllMessages(query: QueryMessageListDto): Promise<IMessage[]> {
    const messageData = await this.messageModel.find({ chatId: query.chatId });
    // if (!messageData || messageData.length == 0) {
    //   throw new NotFoundException('Messages data not found!');
    // }
    return messageData;
  }
  async getMessagesCount(query: QueryMessageListDto): Promise<number> {
    const messagesCount = await this.messageModel.countDocuments({
      chatId: query.chatId,
    });
    return messagesCount;
  }
  async getMessage(messageId: string): Promise<IMessage> {
    const existingMessage = await this.messageModel.findById(messageId).exec();
    if (!existingMessage) {
      throw new NotFoundException(`Message #${messageId} not found`);
    }
    return existingMessage;
  }
  async deleteMessage(messageId: string): Promise<IMessage> {
    const deletedMessage = await this.messageModel.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      throw new NotFoundException(`Message #${messageId} not found`);
    }
    return deletedMessage;
  }
}
