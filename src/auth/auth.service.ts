import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.model';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private JwtService: JwtService,
    private UserService: UserService
  ){}

  async signUp (dto: AuthUserDto) {
    const candidate = await this.UserService.findUser(dto);
    if(candidate){
      throw new HttpException("Пользователь с таким EMAIL уже существует", HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(dto.password, 5)
    const user = await this.UserService.createUser({...dto, password: hashPassword})
    return this.generateToken(user)
  }

  private generateToken(dto: AuthUserDto){
    const payload = {email: dto.email, id: dto.id}
    return {
      token: this.JwtService.sign(payload),
      id: dto.id
    }
  }

  async signIn (dto: AuthUserDto) {
    const user = await this.verifyUser(dto)
    return this.generateToken(user)
  }

  private async verifyUser(dto: AuthUserDto){
    const candidate = await this.UserService.findUser(dto);
    const passwordEquals = await bcrypt.compare(dto.password, candidate.password);
    if(candidate && passwordEquals){
      return candidate
    }
    throw new UnauthorizedException({message: "Пользователя с таким EMAIL или PASSWORD не существует"})
  }
}
