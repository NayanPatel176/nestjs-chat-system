import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { CreateChatListDto } from 'src/chatList/dto/create-chatList.dto';
import { ChatListService } from 'src/chatList/service/chatList.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { MessageService } from 'src/message/service/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayDisconnect {
  constructor(
    private messageService: MessageService,
    private chatListService: ChatListService,
  ) {}

  @WebSocketServer()
  server: Server;

  private groupSockets: Map<string, Set<string>> = new Map();

  afterInit() {
    // server: Server
    console.log('Socket.io server initialized');
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
    // Remove client from groupSockets if necessary
  }

  @SubscribeMessage('joinGroup')
  handleJoinGroup(client: any, groupId: string) {
    if (!this.groupSockets.has(groupId)) {
      this.groupSockets.set(groupId, new Set());
    }
    // let groupSocketSet = this.groupSockets.get(groupId);
    // if (!groupSocketSet) {
    //   groupSocketSet = new Set<string>();
    //   this.groupSockets.set(groupId, groupSocketSet);
    // }
    // groupSocketSet.add(client.id);
    client.join(groupId);
  }

  @SubscribeMessage('message')
  async handleMessage(
    client: any,
    data: { participants: string[]; message: CreateMessageDto },
  ) {
    const { participants = [], message } = data;
    if (participants && participants.length) {
      participants.forEach((id) => {
        this.server.to(id).emit('message', message);
      });
    }
    await this.messageService.createMessage(message);
  }

  @SubscribeMessage('createChat')
  async handleCreateChat(
    client: any,
    @MessageBody() message: CreateChatListDto,
  ) {
    try {
      const newChatList = await this.chatListService.createChatList(message);
      if (message.participants && message.participants.length) {
        message.participants.forEach((participantId) => {
          console.log(
            'participantId: ',
            participantId,
            JSON.stringify(newChatList),
          );
          this.server.to(participantId).emit('recievedChat', newChatList);
        });
      }
    } catch (error) {
      client.emit('error', message);
    }
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log('data: ', data);
    return from([11, 22, 33]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log('data: ', data);
    return data;
  }
}
