import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { findUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: createUserDto) {
    const userData = await this.userRepository.create(dto);
    return userData;
  }

  async findUser(dto: findUserDto) {
    const userData = await this.userRepository.findOne({where: {email: dto.email}})
    return userData
  }

  async getUser() {
    const userBunch = await this.userRepository.findAll()
    return userBunch
  }
}
