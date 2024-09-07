import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Пользователь")
@Controller('user')
export class UserController {

  constructor(
    private UserService: UserService
  ) {}
  @ApiOperation({summary: "Создание пользователя"})
  @Post("/create")
  create(@Body() userDto: createUserDto) {
    return this.UserService.createUser(userDto)
  }

  @ApiOperation({summary: "Получение всех пользователей"})
  @Get("/get")
  get(){
    return this.UserService.getUser()
  }

  @ApiOperation({summary: "Удаление всех пользователей"})
  @Post("/delete")
  delete(){
    return this.UserService.deleteUsers()
  }
}
