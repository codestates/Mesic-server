/* stores controllers for the routers => 라우터에 들어가는 매서드들 */

import * as mongoose from 'mongoose';
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
    private userModel: mongoose.Model<UserDocument>,
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

  async createGoogleUser(userinfo: any): Promise<User> {
    const { id, ...rest } = userinfo;
    const createUser = new this.userModel({ ...rest });
    await createUser.save();
    return createUser;
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getOne(id: string): Promise<User> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return null;
    } else {
      const user = await this.userModel.findById(id).exec();
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

  async update(id: string, data: any) {
    const user = await this.userModel.findByIdAndUpdate(id, data).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    } else {
      return { message: 'seucess' };
    }
  }

  async saveToken(id: string, refreshToken: any) {
    await this.userModel.findByIdAndUpdate(id, refreshToken);
    return;
  }

  async addToFollow(id: string, data: any) {
    const user = await this.userModel.findById(id).exec();

    if (!user.follow.includes(data.id)) {
      user.follow.push(data.id);
      return await user.save();
    } else {
      return null;
    }
  }

  async deleteFromFollow(id: string, data) {
    return await this.userModel
      .findByIdAndUpdate({ _id: id }, { $pullAll: { follow: [data.id] } })
      .exec();
  }

  async getUserId(userData: any) {
    // 이거 왜 안돼지?
    return userData._id;
  }
  async findGoogleUser(id: string): Promise<User> {
    const googleUser = await this.userModel.findOne({ googleId: id });
    return googleUser;
  }
}
