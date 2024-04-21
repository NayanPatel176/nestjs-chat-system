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
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { QueryUserListDto } from 'src/user/dto/query-user.dto';
import { UserService } from 'src/user/service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/login')
  async createUser(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        userId: user._id,
        status: HttpStatus.CREATED,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }
  @Get()
  async getUsers(
    @Res() response: Response,
    @Query() userQuery: QueryUserListDto,
  ) {
    try {
      const usersList = await this.userService.getAllUsers(userQuery);
      const usersCount = await this.userService.getAllUsers(userQuery);
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        usersList,
        usersCount,
      });
    } catch (err) {
      console.log('err: ', err);
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/details')
  async getUser(@Res() response: Response, @Query('userId') userId: string) {
    console.log('userId: ', userId);
    try {
      const userDetails = await this.userService.getUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        userDetails,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteUser(@Res() response: Response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
