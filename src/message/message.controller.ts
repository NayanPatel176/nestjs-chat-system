import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { MessageService } from 'src/message/service/message.service';
import { QueryMessageListDto } from './dto/query-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post()
  async createMessage(
    @Res() response: Response,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    try {
      const newMessage =
        await this.messageService.createMessage(createMessageDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Message has been created successfully',
        newMessage,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Message not created!',
        error: 'Bad Request',
      });
    }
  }
  @Get()
  async getMessages(
    @Res() response: Response,
    @Query() queryMessage: QueryMessageListDto,
  ) {
    try {
      const messageData =
        await this.messageService.getAllMessages(queryMessage);
      const messagesCount =
        await this.messageService.getMessagesCount(queryMessage);
      return response.status(HttpStatus.OK).json({
        message: 'All messages data found successfully',
        messages: messageData,
        messagesCount,
      });
    } catch (err) {
      console.log('err: ', err);
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getMessage(@Res() response: Response, @Param('id') messageId: string) {
    try {
      const existingMessage = await this.messageService.getMessage(messageId);
      return response.status(HttpStatus.OK).json({
        message: 'Message found successfully',
        existingMessage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteMessage(
    @Res() response: Response,
    @Param('id') messageId: string,
  ) {
    try {
      const deletedMessage = await this.messageService.deleteMessage(messageId);
      return response.status(HttpStatus.OK).json({
        message: 'Message deleted successfully',
        deletedMessage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
