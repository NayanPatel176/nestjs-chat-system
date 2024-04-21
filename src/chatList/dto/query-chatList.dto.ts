import { IsNotEmpty, IsString } from 'class-validator';

export class QueryChatListListDto {
  @IsString()
  @IsNotEmpty()
  limit: number;

  @IsString()
  @IsNotEmpty()
  skip: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
