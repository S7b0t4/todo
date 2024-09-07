import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { findUserDto } from './dto/find-user.dto';
import { Sequelize } from 'sequelize-typescript';
import { Task } from 'src/task/task.model';

@Injectable()
export class UserService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(User) private taskRepository: typeof Task,
    ) {}

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

  async deleteUsers() {
    try{
      await this.sequelize.query('TRUNCATE TABLE "tasks" RESTART IDENTITY CASCADE;');
      await this.sequelize.query('TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;');

      return "DELETE"
    }catch(e){
      console.log(e)
      throw new HttpException("Проблема удаления", HttpStatus.BAD_REQUEST)
    }

  }
}
