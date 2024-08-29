import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.model';
import { AuthUserDto } from './dto/auth-user.dto';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService
  ) {}

  @ApiOperation({summary: "Регистрация"})
  @Post("/signUp")
  signUp(@Body() dto: AuthUserDto){
    return this.AuthService.signUp(dto)
  }

  @ApiOperation({summary: "Вход в систему"})
  @Post("/signIn")
  signIn(@Body() dto: AuthUserDto){
    return this.AuthService.signIn(dto)
  }
}
