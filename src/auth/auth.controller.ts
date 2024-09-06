import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { signInAuthDto } from './dto/signIn-auth.dto';
import { signUpAuthDto } from './dto/signUp-auth.dto';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

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
  
  @Get("google/login")
  @UseGuards(GoogleAuthGuard)
  googleLogin(){
    console.log("go")
  }
  
  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req, @Res() res){
    res.redirect(`https://todo-smallgigached.netlify.app/home/home.html?token=${req.user.token}`)
  }
}
