/* stores controllers for the routers => 라우터에 들어가는 매서드들 */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return await createUser.save();
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // getAll(): User[] {
  //   return this.users;
  // }

  // getOne(id: string): User {
  //   return this.users.find((users) => users.id === +id);
  // }
}
