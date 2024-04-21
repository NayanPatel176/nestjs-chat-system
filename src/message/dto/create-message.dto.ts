import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsDateString,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(24)
  readonly chatId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(24)
  readonly senderId: string;

  @IsNotEmpty()
  @IsString()
  readonly message: string;

  @IsNotEmpty()
  @IsDateString()
  readonly createdAt: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly senderName: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isGroupChat: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  readonly groupName?: string;
}
