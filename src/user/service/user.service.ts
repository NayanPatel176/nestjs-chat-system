import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IUser } from 'src/user/interface/user.interface';
import { Model } from 'mongoose';
import { QueryUserListDto } from '../dto/query-user.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const user = await this.userModel.findOneAndUpdate(
      createUserDto,
      createUserDto,
      {
        new: true,
        upsert: true,
      },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.toObject();
  }

  async getAllUsers(userQuery: QueryUserListDto): Promise<IUser[]> {
    const userData = await this.userModel
      .find({ _id: { $nin: [userQuery.userId] } })
      .skip(userQuery.skip || 0)
      .limit(userQuery.limit || 10);
    // if (!userData || userData.length == 0) {
    //   throw new NotFoundException('Users data not found!');
    // }
    return userData;
  }

  async getAllUsersCount(userQuery: QueryUserListDto): Promise<number> {
    const usersCount = await this.userModel.countDocuments({
      _id: { $nin: [userQuery.userId] },
    });
    return usersCount;
  }

  async getUser(userId: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  async getUsersByIds(userIds: string[]): Promise<IUser[]> {
    const userData = await this.userModel
      .find({ _id: { $in: userIds } })
      .exec();
    return userData;
  }

  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return deletedUser;
  }
}
