import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './dto/task.model';
import { findTaskDto } from './dto/find-task.dto';
import { changeTaskDto } from './dto/change-task.dto';
import { findTaskByUserIdDto } from './dto/find-by-userid-task.dto';
import { switchTaskDto } from './dto/switch-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}
  async createTask(dto: createTaskDto) {
    const task = await this.taskRepository.create(dto);
    return task;
  }

  async findTask(dto: findTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id: dto.taskId, userId: dto.userId },
    });
    return task;
  }

  async findTaskByUserId(dto: findTaskByUserIdDto) {
    const task = await this.taskRepository.findAll({
      where: { userId: dto.userId }
    });
    return task;
  }

  async changeTask(dto: changeTaskDto) {
    const candidate = await this.findTask(dto);
    if (!candidate) {
      throw new HttpException('Таких задач нет', HttpStatus.NOT_FOUND);
    }
    try {
      candidate.text = dto.text;
      candidate.save();
      return candidate;
    } catch (e) {
      console.log(e);
    }
  }

  async switchTask(dto: switchTaskDto) {
    const candidate = await this.findTask(dto);
    if (!candidate) {
      throw new HttpException('Такой задачи нет', HttpStatus.NOT_FOUND);
    }
    try{
      candidate.switch = dto.switch;
      candidate.save();
      return candidate
    }catch(e){
      console.log(e)
    }
  }
}
