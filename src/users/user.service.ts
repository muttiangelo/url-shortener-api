import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username }).exec();
  }
}
