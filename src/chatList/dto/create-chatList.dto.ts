import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  // ValidateNested,
} from 'class-validator';

class UserDto {
  @IsString()
  @IsNotEmpty()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  userName: string;
}

export class CreateChatListDto {
  @IsBoolean()
  @IsNotEmpty()
  isGroupChat: boolean;

  @IsOptional()
  @IsString()
  groupName?: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  participants: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  userList?: UserDto[];

  // @IsNotEmpty()
  // createdAt: Date;

  // lastMessAt: Date;
}
