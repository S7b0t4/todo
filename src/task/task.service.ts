import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { findTaskDto } from './dto/find-task.dto';
import { changeTaskDto } from './dto/change-task.dto';
import { findTaskByUserIdDto } from './dto/find-by-userid-task.dto';
import { switchTaskDto } from './dto/switch-task.dto';
import { deleteTaskDto } from './dto/delete-task.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwtConstants';

@Injectable()
export class TaskService {
  constructor(
    private JwtService: JwtService,
    @InjectModel(Task) private taskRepository: typeof Task
    ) {}

  private async getUserId(token: string){
    try{
      const payload = await this.JwtService.verify(
        token,
        {
          secret: jwtConstants.secret
        }
      )
      if(payload){
        return payload.id
      }
    }
    catch(e){
      console.log(e)
      return false
    }
  }

  async createTask(dto: createTaskDto) {
    let userId = await this.getUserId(dto.token)
    if(userId){
      const task = await this.taskRepository.create({...dto, userId: userId});
      return task;
    }
    throw new HttpException("Не верный ТОКЕН", HttpStatus.BAD_REQUEST)
  }

  async findTask(dto: findTaskDto) {
    let userId = await this.getUserId(dto.token)
    if(userId){
      const task = await this.taskRepository.findOne({
        where: { id: dto.taskId, userId: userId },
      });
      return task;
    }
  }

  async findTaskByUserId(dto: findTaskByUserIdDto) {
    let userId = await this.getUserId(dto.token)
    if(userId){
      const task = await this.taskRepository.findAll({
        where: { userId: userId }
      });
      return task;
    }
    throw new HttpException("Не верный ТОКЕН", HttpStatus.BAD_REQUEST)
  }

  async changeTask(dto: changeTaskDto) {
    let userId = await this.getUserId(dto.token)
    if(userId){
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
    throw new HttpException("Не верный ТОКЕН", HttpStatus.BAD_REQUEST)
  }

  async switchTask(dto: switchTaskDto) {
    let userId = await this.getUserId(dto.token)
    if(userId){
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
    throw new HttpException("Не верный ТОКЕН", HttpStatus.BAD_REQUEST)
  }

  async deleteTask(dto: deleteTaskDto){
    const candidate = await this.findTask(dto);
    if(!candidate) {
      throw new HttpException('Такой задачи нет', HttpStatus.NOT_FOUND)
    }
    try{
      candidate.destroy()
      return "Delete"
    }
    catch(err){
      console.log(err)
    }
  }

  async findAllTask(){
    const task = await this.taskRepository.findAll()
    return task
  }
}
