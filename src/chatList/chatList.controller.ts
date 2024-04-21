import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateChatListDto } from 'src/chatList/dto/create-chatList.dto';
import { ChatListService } from 'src/chatList/service/chatList.service';
import { UserService } from 'src/user/service/user.service';
import { QueryChatListListDto } from './dto/query-chatList.dto';

@Controller('chatList')
export class ChatListController {
  constructor(
    private readonly chatListService: ChatListService,
    private readonly userService: UserService,
  ) {}
  @Post()
  async createChatList(
    @Res() response: Response,
    @Body() createChatListDto: CreateChatListDto,
  ) {
    try {
      const newChatList =
        await this.chatListService.createChatList(createChatListDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'ChatList has been created successfully',
        data: newChatList,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: ChatList not created!',
        error: 'Bad Request',
      });
    }
  }
  @Get()
  async getChatLists(
    @Res() response: Response,
    @Query() messageQuery: QueryChatListListDto,
  ) {
    try {
      const chatListData =
        await this.chatListService.getAllChatLists(messageQuery);
      const chatListCount =
        await this.chatListService.getAllChatsCount(messageQuery);
      return response.status(HttpStatus.OK).json({
        message: 'All chatLists data found successfully',
        chats: chatListData,
        chatCount: chatListCount,
      });
    } catch (err) {
      console.log('err: ', err);
      return response.status(err.status).json(err.response);
    }
  }
}
