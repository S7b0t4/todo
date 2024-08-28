import { Body, Controller, Post } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';

import { TaskService } from './task.service';
import { changeTaskDto } from './dto/change-task.dto';
import { findTaskByUserIdDto } from './dto/find-by-userid-task.dto';
import { switchTaskDto } from './dto/switch-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { deleteTaskDto } from './dto/delete-task.dto';

@ApiTags("Задача")
@Controller('task')
export class TaskController {

  constructor(
    private taskService: TaskService
  ) {}
  @ApiOperation({summary: "Создание задачи"})
  @Post("/create")
  create(@Body() taskDto: createTaskDto){
    return this.taskService.createTask(taskDto)
  }

  @ApiOperation({summary: "Изменение текста задачи"})
  @Post("/change")
  change(@Body() taskDto: changeTaskDto){
    return this.taskService.changeTask(taskDto)
  }

  @ApiOperation({summary: "Получение всех задач по userId"})
  @Post("/get")
  getByUserId(@Body() taskDto: findTaskByUserIdDto){
    return this.taskService.findTaskByUserId(taskDto)
  }

  @ApiOperation({summary: "Изменение чекбокс значения (значение выполнена задача или нет)"})
  @Post("/switch")
  switch(@Body() taskDto: switchTaskDto){
    return this.taskService.switchTask(taskDto)
  }

  @ApiOperation({summary: "Удаление задачи по taskId"})
  @Post("/delete")
  delete(@Body() taskDto: deleteTaskDto){
    return this.taskService.deleteTask(taskDto)
  }


}
