import { Body, Controller, Post } from '@nestjs/common';
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
}
