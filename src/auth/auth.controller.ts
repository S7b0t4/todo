import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { signInAuthDto } from './dto/signIn-auth.dto';
import { signUpAuthDto } from './dto/signUp-auth.dto';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService
  ) {}

  @ApiOperation({summary: "Регистрация"})
  @Post("/signUp")
  signUp(@Body() dto: signUpAuthDto){
    return this.AuthService.signUp(dto)
  }

  @ApiOperation({summary: "Вход в систему"})
  @Post("/signIn")
  signIn(@Body() dto: signInAuthDto){
    return this.AuthService.signIn(dto)
  }
}
