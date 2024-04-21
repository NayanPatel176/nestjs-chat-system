import { Module } from '@nestjs/common';
import { ChatListController } from './chatList.controller';
import { ChatListService } from './service/chatList.service';
import { ChatList, ChatListSchema } from './schema/chatList.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatList.name, schema: ChatListSchema },
    ]),
    UserModule,
  ],
  controllers: [ChatListController],
  providers: [ChatListService],
  exports: [ChatListService],
})
export class ChatListModule {}
