import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateChatListDto } from 'src/chatList/dto/create-chatList.dto';
import { IChatList } from 'src/chatList/interface/chatList.interface';
import { Model } from 'mongoose';
import { QueryChatListListDto } from '../dto/query-chatList.dto';
import { UserService } from 'src/user/service/user.service';
@Injectable()
export class ChatListService {
  constructor(
    @InjectModel('ChatList') private chatListModel: Model<IChatList>,
    private readonly userService: UserService,
  ) {}

  async createChatList(
    createChatListDto: CreateChatListDto,
  ): Promise<IChatList> {
    if (createChatListDto.participants.length < 2) {
      // return response.status(HttpStatus.BAD_REQUEST).json({
      //   message: 'Participants array must contain more than 2 values.',
      //   status: HttpStatus.BAD_REQUEST,
      // });
      throw new Error('Participants array must contain more than 2 values.');
    }
    const participantsData = await this.userService.getUsersByIds(
      createChatListDto.participants,
    );
    createChatListDto.userList = participantsData;

    if (createChatListDto.isGroupChat) {
      createChatListDto.groupName = `Group ${Math.floor(Date.now() / 1000)}`;
    }
    const chatList = await this.chatListModel.findOneAndUpdate(
      createChatListDto,
      createChatListDto,
      {
        new: true,
        upsert: true,
      },
    );

    if (!chatList) {
      throw new NotFoundException('Chat list not found');
    }

    console.log('participantsData[0]: ', participantsData[0]);
    const senderName = participantsData[0].userName;
    const senderId = participantsData[0]._id;

    return {
      ...chatList.toObject(),
      senderName,
      senderId,
    } as IChatList;
  }

  async getAllChatLists(query: QueryChatListListDto): Promise<IChatList[]> {
    const chatListData = await this.chatListModel
      .find({ participants: { $in: [query.userId] } })
      .sort({ lastMessAt: -1, createdAt: -1 })
      .skip(query.skip || 0)
      .limit(query.limit || 10);
    if (!chatListData || chatListData.length == 0) {
      throw new NotFoundException('ChatLists data not found!');
    }
    return chatListData;
  }

  async getAllChatsCount(query: QueryChatListListDto): Promise<number> {
    const chatsCount = await this.chatListModel.countDocuments({
      participants: { $in: [query.userId] },
    });
    return chatsCount;
  }

  async getChatList(chatListId: string): Promise<IChatList> {
    const existingChatList = await this.chatListModel
      .findById(chatListId)
      .exec();
    if (!existingChatList) {
      throw new NotFoundException(`ChatList #${chatListId} not found`);
    }
    return existingChatList;
  }
}
