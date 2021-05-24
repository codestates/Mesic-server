/* stores controllers for the routers => 라우터에 들어가는 매서드들 */

import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
// import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';
import { bcryptConstant } from './constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExisted = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (isExisted) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`this email is already existed!`],
        error: 'Forbidden',
      });
    }
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      bcryptConstant.saltOrRounds,
    );
    const createUser = new this.userModel(createUserDto);
    return await createUser.save();
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    } else {
      return user;
    }
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async logout(userId: string) {
    const logoutUser = await this.userModel
      .findByIdAndUpdate({ _id: userId }, { refreshToken: '' })
      .exec();
    if (!logoutUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    } else {
      return { message: 'seucess' };
    }
  }

  async update(id: string, data) {
    const user = await this.userModel.findByIdAndUpdate(id, data).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    } else {
      return { message: 'seucess' };
    }
  }

  async saveToken(id: string, refreshToken) {
    await this.userModel.findByIdAndUpdate(id, refreshToken);
    return;
  }

  async addToFollow(id: string, data) {
    const user = await this.userModel.findById(id).exec();

    if (!user.follow.includes(data.id)) {
      user.follow.push(data.id);
      return await user.save();
    } else {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`this follow is already existed!`],
        error: 'Forbidden',
      });
    }
  }

  async deleteFromFollow(id: string, data) {
    return await this.userModel
      .findByIdAndUpdate({ _id: id }, { $pullAll: { follow: [data.id] } })
      .exec();
  }
}
