import { IsNotEmpty, IsString } from 'class-validator';

export class QueryMessageListDto {
  @IsString()
  @IsNotEmpty()
  limit: number;

  @IsString()
  @IsNotEmpty()
  skip: number;

  @IsString()
  @IsNotEmpty()
  chatId: string;
}
