import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { MessageModule } from 'src/message/message.module';
import { ChatListModule } from 'src/chatList/chatList.module';

@Module({
  imports: [MessageModule, ChatListModule],
  providers: [EventsGateway],
})
export class EventsModule {}
