import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly userName: string;
}
