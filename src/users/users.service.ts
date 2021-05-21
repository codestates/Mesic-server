/* stores controllers for the routers => 라우터에 들어가는 매서드들 */

import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return await createUser.save();
  }

  //
  async findOne(name: string): Promise<User[] | undefined> {
    return await this.userModel.find((user) => user.name === name);
  }

  async findUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }
  //

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

  async login(data) {
    const { name, password } = data;
    const user = await this.userModel.findOne({ name });

    if (user.password === password && !!user) {
      return true;
    } else {
      return false;
    }
  }

  async logout() {}

  async update(id: string, data): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, data);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    } else {
      return user;
    }
  }

  //
  private;
}
